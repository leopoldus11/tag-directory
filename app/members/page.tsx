import { getAllAuthors } from "@/lib/authors";
import { MemberProfile } from "@/components/member-profile";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members | tracking.directory",
  description: "Browse members of the tracking.directory community",
};

export default async function MembersPage() {
  const authors = getAllAuthors();

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-semibold">Browse Members</h1>
              <p className="text-muted-foreground">
                Join the tracking community with {authors.length}+ members.
              </p>
            </div>
            <Button className="gap-2 rounded-full" asChild>
              <Link href="/login">
                <UserPlus className="h-4 w-4" />
                Join the community
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search members..."
              className="w-full max-w-md"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {authors
              .sort((a, b) => (b.credits || 0) - (a.credits || 0))
              .map((author) => (
                <MemberProfile key={author.username} author={author} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
