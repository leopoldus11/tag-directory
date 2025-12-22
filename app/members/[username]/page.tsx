import { notFound } from "next/navigation";
import { getAuthorByUsername } from "@/lib/authors";
import { getUserById, getUserByGitHubUsername } from "@/lib/users";

// Server-side rank calculation (duplicate of client function to avoid import issues)
function getAuthorRank(author: { credits?: number }) {
  const credits = author.credits || 0;
  if (credits >= 5000) return "Diamond";
  if (credits >= 1500) return "Platinum";
  if (credits >= 500) return "Gold";
  if (credits >= 100) return "Silver";
  return "Bronze";
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditBadge } from "@/components/credit-badge";
import { RankDisplay } from "@/components/rank-display";
import { MemberProfile } from "@/components/member-profile";
import { ExternalLink, UserPlus, Github, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { getAllBlueprints } from "@/lib/blueprints";
import type { Metadata } from "next";

interface MemberPageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { username } = await params;
  const author = getAuthorByUsername(username);

  if (!author) {
    return {
      title: "Member Not Found",
    };
  }

  return {
    title: `${author.name} | tracking.directory`,
    description: author.bio || `Profile of ${author.name} on tracking.directory`,
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { username } = await params;
  
  // Try to get user from new user system first, then fall back to author system
  let user = getUserById(username) || getUserByGitHubUsername(username);
  const author = getAuthorByUsername(username);

  // If no user found, create from author data or return 404
  if (!user && !author) {
    notFound();
  }

  // Merge user and author data (user takes precedence)
  const userData: {
    id: string;
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
    githubUsername?: string;
  } = user || {
    id: author!.username,
    name: author!.name,
    avatar: author!.avatar,
    bio: author!.bio,
    github: author!.github,
    credits: author!.credits || 0,
    rank: getAuthorRank(author!),
    followers: author!.followers || 0,
    following: author!.following || 0,
    contributions: author!.contributions || 0,
    isOpenForWork: author!.isOpenForWork || false,
    availabilityType: author!.availabilityType,
    skills: author!.skills || [],
  };

  const rank = userData.rank;
  const credits = userData.credits;
  const blueprints = getAllBlueprints();
  const userBlueprints = blueprints.filter(
    (b) => {
      const authors = Array.isArray(b.author) ? b.author : [b.author];
      return authors.includes(username) || authors.includes(userData.githubUsername || "");
    }
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
          {/* Profile Header */}
          <Card className="mb-6 border-border/50 bg-card/50">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
                <div className="mb-4 md:mb-0 md:mr-6 relative">
                  {userData.avatar?.startsWith("http") ? (
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 text-2xl font-medium text-foreground">
                      {userData.avatar}
                    </div>
                  )}
                  {userData.isOpenForWork && (
                    <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-2 border-background bg-green-500 flex items-center justify-center" title="Open for work">
                      <span className="text-xs text-white font-bold">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex flex-col items-center md:items-start">
                    <h1 className="mb-2 text-3xl font-semibold">{userData.name}</h1>
                    <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      <CreditBadge credits={credits} rank={rank} size="lg" />
                      {userData.isOpenForWork && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          <Briefcase className="mr-1.5 h-3 w-3" />
                          Open for {userData.availabilityType || "work"}
                        </Badge>
                      )}
                    </div>
                    <RankDisplay rank={rank} credits={credits} size="md" showProgress />
                  </div>
                  
                  {userData.bio && (
                    <p className="mb-4 text-muted-foreground">{userData.bio}</p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                    {(userData.followers !== undefined || userData.following !== undefined) && (
                      <>
                        <span>{userData.followers || 0} Followers</span>
                        <span>•</span>
                        <span>{userData.following || 0} Following</span>
                        <span>•</span>
                      </>
                    )}
                    <span className="font-mono">{userData.contributions} contributions</span>
                    {userData.github && (
                      <>
                        <span>•</span>
                        <Link
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-foreground transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
                    <Button className="rounded-full" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Follow
                    </Button>
                    {userData.isOpenForWork && (
                      <Button variant="outline" className="rounded-full" size="sm">
                        Contact
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          {userData.skills && userData.skills.length > 0 && (
            <Card className="mb-6 border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contributions */}
          <Card className="mb-6 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Contributions ({userBlueprints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {userBlueprints.length === 0 ? (
                <p className="text-sm text-muted-foreground">No contributions yet</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {userBlueprints.map((blueprint) => (
                    <Link
                      key={blueprint.id}
                      href={`/tags/${blueprint.slug}`}
                      className="rounded-lg border border-border/30 bg-muted/10 p-3 transition-all hover:border-border/50 hover:bg-muted/20"
                    >
                      <h3 className="mb-1 text-sm font-semibold">{blueprint.title}</h3>
                      <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
                        {blueprint.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {blueprint.platform}
                        </Badge>
                        {blueprint.community_verified && (
                          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

