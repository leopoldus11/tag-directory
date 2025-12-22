"use client";

import { ContributorRank, getRankFromCredits } from "./credit-badge";
import { cn } from "@/lib/utils";

interface RankDisplayProps {
  rank: ContributorRank;
  credits: number;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
}

const rankInfo: Record<ContributorRank, { nextRank?: ContributorRank; nextThreshold: number; name: string }> = {
  Bronze: { nextRank: "Silver", nextThreshold: 100, name: "Bronze Contributor" },
  Silver: { nextRank: "Gold", nextThreshold: 500, name: "Silver Contributor" },
  Gold: { nextRank: "Platinum", nextThreshold: 1500, name: "Gold Contributor" },
  Platinum: { nextRank: "Diamond", nextThreshold: 5000, name: "Platinum Contributor" },
  Diamond: { nextThreshold: Infinity, name: "Diamond Contributor" },
};

export function RankDisplay({ rank, credits, size = "md", showProgress = false }: RankDisplayProps) {
  const info = rankInfo[rank];
  const progress = info.nextRank
    ? Math.min(100, ((credits / info.nextThreshold) * 100))
    : 100;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("space-y-2", sizeClasses[size])}>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">{info.name}</span>
        {showProgress && info.nextRank && (
          <span className="text-muted-foreground">
            {credits.toLocaleString()} / {info.nextThreshold.toLocaleString()} to {info.nextRank}
          </span>
        )}
      </div>
      {showProgress && info.nextRank && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

