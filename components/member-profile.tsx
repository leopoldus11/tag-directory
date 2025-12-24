"use client";

import { Author } from "@/lib/authors";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";

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
      <UserAvatar
        name={author.name}
        avatar={author.avatar}
        size={compact ? "sm" : "md"}
        showStatusDot={author.isOpenForWork}
      />
      <p className="text-sm font-medium text-foreground truncate flex-1">{author.name}</p>
    </Link>
  );
}

