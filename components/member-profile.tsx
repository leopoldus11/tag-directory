"use client";

import { Author } from "@/lib/authors";
import Link from "next/link";

interface MemberProfileProps {
  author: Author;
  compact?: boolean;
}

export function MemberProfile({ author, compact = false }: MemberProfileProps) {
  return (
    <Link
      href={`/members/${author.username}`}
      className="group relative flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-3 hover:border-border/80 hover:bg-card transition-all"
    >
      <div className="relative shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-sm font-medium text-foreground">
          {author.avatar}
        </div>
        {author.isOpenForWork && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" title="Open for work" />
        )}
      </div>
      <p className="text-sm font-medium text-foreground truncate flex-1">{author.name}</p>
    </Link>
  );
}
