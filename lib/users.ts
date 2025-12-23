import fs from "fs";
import path from "path";
import { Author } from "./authors";

const USERS_DIR = path.join(process.cwd(), "data", "users");

// In serverless environments like Vercel the filesystem is read-only at runtime.
// We still support file-based storage locally, but avoid mkdir/write in production.
const IS_READ_ONLY_FS =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

// Ensure users directory exists (only when filesystem is writable)
if (!IS_READ_ONLY_FS) {
  try {
    if (!fs.existsSync(USERS_DIR)) {
      fs.mkdirSync(USERS_DIR, { recursive: true });
    }
  } catch (error) {
    console.error("Failed to create users directory:", error);
  }
}

export interface User {
  id: string; // GitHub username or email
  githubUsername?: string;
  googleEmail?: string;
  name: string;
  avatar: string;
  bio?: string;
  github?: string;
  credits: number;
  rank: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  followers: number;
  following: number;
  contributions: number;
  isOpenForWork: boolean;
  availabilityType?: "freelance" | "full-time" | "part-time" | "not-available";
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user by ID (GitHub username or email)
 */
export function getUserById(id: string): User | null {
  const filePath = path.join(USERS_DIR, `${id}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as User;
  } catch (error) {
    console.error(`Error reading user ${id}:`, error);
    return null;
  }
}

/**
 * Get user by GitHub username
 */
export function getUserByGitHubUsername(username: string): User | null {
  // Try direct file lookup first
  const user = getUserById(username);
  if (user) return user;

  // Search all user files for matching GitHub username
  if (!fs.existsSync(USERS_DIR)) {
    return null;
  }

  const files = fs.readdirSync(USERS_DIR).filter((f) => f.endsWith(".json"));
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(USERS_DIR, file), "utf-8");
      const user = JSON.parse(content) as User;
      if (user.githubUsername === username) {
        return user;
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

/**
 * Create or update user
 */
export function createOrUpdateUser(userData: Partial<User> & { id: string }): User {
  const existingUser = getUserById(userData.id);
  
  const now = new Date().toISOString();
  
  const user: User = {
    id: userData.id,
    githubUsername: userData.githubUsername || existingUser?.githubUsername,
    googleEmail: userData.googleEmail || existingUser?.googleEmail,
    name: userData.name || existingUser?.name || userData.id,
    avatar: userData.avatar || existingUser?.avatar || userData.name?.[0] || "U",
    bio: userData.bio || existingUser?.bio,
    github: userData.github || existingUser?.github,
    credits: existingUser?.credits || userData.credits || 0,
    rank: existingUser?.rank || userData.rank || "Bronze",
    followers: existingUser?.followers || userData.followers || 0,
    following: existingUser?.following || userData.following || 0,
    contributions: existingUser?.contributions || userData.contributions || 0,
    isOpenForWork: existingUser?.isOpenForWork || userData.isOpenForWork || false,
    availabilityType: userData.availabilityType || existingUser?.availabilityType,
    skills: userData.skills || existingUser?.skills || [],
    createdAt: existingUser?.createdAt || now,
    updatedAt: now,
  };

  // Calculate rank based on credits
  if (user.credits >= 5000) user.rank = "Diamond";
  else if (user.credits >= 1500) user.rank = "Platinum";
  else if (user.credits >= 500) user.rank = "Gold";
  else if (user.credits >= 100) user.rank = "Silver";
  else user.rank = "Bronze";

  // Persist to disk only when filesystem is writable (local development).
  if (!IS_READ_ONLY_FS) {
    try {
      const filePath = path.join(USERS_DIR, `${user.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(user, null, 2), "utf-8");
    } catch (error) {
      console.error("Failed to write user file:", error);
    }
  }

  return user;
}

/**
 * Get all users
 */
export function getAllUsers(): User[] {
  if (!fs.existsSync(USERS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(USERS_DIR).filter((f) => f.endsWith(".json"));
  const users: User[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(USERS_DIR, file), "utf-8");
      users.push(JSON.parse(content) as User);
    } catch (error) {
      console.error(`Error reading user file ${file}:`, error);
      continue;
    }
  }

  return users.sort((a, b) => (b.credits || 0) - (a.credits || 0));
}

/**
 * Convert NextAuth user to our User format
 */
export function createUserFromAuth(
  authUser: { id: string; name?: string | null; email?: string | null; image?: string | null },
  provider: "github" | "google"
): Partial<User> {
  const username = provider === "github" 
    ? authUser.name || authUser.email?.split("@")[0] || authUser.id
    : authUser.email?.split("@")[0] || authUser.name || authUser.id;

  return {
    id: username.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    githubUsername: provider === "github" ? username : undefined,
    googleEmail: provider === "google" ? authUser.email || undefined : undefined,
    name: authUser.name || username,
    avatar: authUser.image || authUser.name?.[0]?.toUpperCase() || "U",
    github: provider === "github" ? `https://github.com/${username}` : undefined,
  };
}

