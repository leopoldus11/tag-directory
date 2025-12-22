"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type ContributorRank = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";

interface CreditBadgeProps {
  credits: number;
  rank: ContributorRank;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const rankConfig: Record<ContributorRank, { color: string; icon: string; gradient: string }> = {
  Bronze: {
    color: "text-amber-600",
    icon: "🥉",
    gradient: "from-amber-500/20 to-amber-600/10",
  },
  Silver: {
    color: "text-slate-400",
    icon: "🥈",
    gradient: "from-slate-400/20 to-slate-500/10",
  },
  Gold: {
    color: "text-yellow-500",
    icon: "🥇",
    gradient: "from-yellow-500/20 to-yellow-600/10",
  },
  Platinum: {
    color: "text-cyan-400",
    icon: "💎",
    gradient: "from-cyan-400/20 to-cyan-500/10",
  },
  Diamond: {
    color: "text-purple-400",
    icon: "💠",
    gradient: "from-purple-400/20 to-purple-500/10",
  },
};

export function getRankFromCredits(credits: number): ContributorRank {
  if (credits >= 5000) return "Diamond";
  if (credits >= 1500) return "Platinum";
  if (credits >= 500) return "Gold";
  if (credits >= 100) return "Silver";
  return "Bronze";
}

export function CreditBadge({ credits, rank, showLabel = true, size = "md" }: CreditBadgeProps) {
  const config = rankConfig[rank];
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "border-current/20 bg-gradient-to-br",
        config.gradient,
        config.color,
        sizeClasses[size],
        "font-semibold"
      )}
    >
      <span className="mr-1.5">{config.icon}</span>
      <span className="font-mono">{credits.toLocaleString()}</span>
      {showLabel && (
        <>
          <span className="mx-1.5 opacity-50">•</span>
          <span>{rank}</span>
        </>
      )}
    </Badge>
  );
}

