import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createOrUpdateUser, createUserFromAuth } from "@/lib/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // NextAuth automatically detects the URL from the request in development
  // In production, it uses NEXTAUTH_URL or VERCEL_URL if set
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Create or update user profile on sign in
      if (user && account) {
        const provider = account.provider as "github" | "google";
        const userData = createUserFromAuth(
          {
            id: user.id || account.providerAccountId || user.email || "unknown",
            name: user.name,
            email: user.email,
            image: user.image,
          },
          provider
        );

        // Extract GitHub username from profile if available
        if (provider === "github" && profile?.login) {
          userData.githubUsername = profile.login as string;
          userData.id = profile.login as string;
        }

        createOrUpdateUser({
          ...userData,
          id: userData.id || user.id || account.providerAccountId || "unknown",
        });
      }
      return true;
    },
    async session({ session, token }) {
      // Add user ID and profile data to session
      if (session.user) {
        const userId = (token.sub || token.id || "") as string;
        session.user.id = userId;
        
        // Try to get user profile data
        if (userId) {
          const { getUserById } = await import("@/lib/users");
          const userProfile = getUserById(userId);
          if (userProfile) {
            session.user.credits = userProfile.credits;
            session.user.rank = userProfile.rank;
          }
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Persist user ID to token
      if (user) {
        token.id = user.id;
        token.sub = user.id;
      }
      
      // Add GitHub username if available
      if (account?.provider === "github" && profile?.login) {
        token.githubUsername = profile.login as string;
        token.sub = profile.login as string;
      }
      
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const { GET, POST } = handlers;
