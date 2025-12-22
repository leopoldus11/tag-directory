"use client";

import { Author } from "@/lib/authors";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface MemberProfileProps {
  author: Author;
  compact?: boolean;
}

export function MemberProfile({ author, compact = false }: MemberProfileProps) {
  if (compact) {
    return (
      <Link
        href={`/members/${author.username}`}
        className="flex flex-col items-center rounded-lg border border-border/50 bg-card/50 p-4 hover:border-border/80 hover:bg-card transition-all text-center"
      >
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 text-base font-medium text-foreground">
          {author.avatar}
        </div>
        <p className="mb-1 text-sm font-semibold">{author.name}</p>
        <p className="mb-1 text-xs text-muted-foreground font-mono">{author.contributions} contributions</p>
        {author.bio && (
          <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">{author.bio}</p>
        )}
      </Link>
    );
  }

  return (
    <Card className="transition-all hover:border-border/80 hover:bg-card border-border/50 bg-card/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 text-lg font-medium text-foreground">
            {author.avatar}
          </div>
          <h3 className="mb-1 text-lg font-semibold">{author.name}</h3>
          {author.bio && (
            <p className="mb-2 text-sm text-muted-foreground">{author.bio}</p>
          )}
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-mono">{author.contributions} contributions</span>
            {author.github && (
              <Link
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                GitHub
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
          <Link
            href={`/members/${author.username}`}
            className="text-sm text-primary hover:underline"
          >
            View Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

