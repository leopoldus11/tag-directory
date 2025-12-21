"use client";

import { RecipeMetadata } from "@/types/recipe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RecipeCardProps {
  recipe: RecipeMetadata;
  onView?: (id: string) => void;
  type?: "recipe" | "script";
}

const difficultyColors = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

const platformColors: Record<string, string> = {
  GA4: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Meta: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Consent: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Server-Side": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  GTM: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Adobe Launch": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Other: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export function RecipeCard({ recipe, onView, type = "recipe" }: RecipeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Use blueprints route for recipes
  const href = type === "recipe" ? `/blueprints/${recipe.id}` : `/${type}s/${recipe.id}`;

  return (
    <Link href={href}>
      <Card className="group relative h-full cursor-pointer border-border/50 bg-card/50 transition-all hover:border-border/80 hover:bg-card hover:shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="mb-1.5 line-clamp-2 text-base font-medium leading-tight">
                {recipe.name}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                {recipe.description || "No description available"}
              </CardDescription>
            </div>
            {recipe.vendorIcon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/30 text-base">
                {recipe.vendorIcon}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className={cn(
                "text-xs border font-normal",
                platformColors[recipe.platform] || platformColors.Other
              )}
            >
              {recipe.platform}
            </Badge>
            <Badge
              variant="outline"
              className={cn("text-xs border font-normal", difficultyColors[recipe.difficulty])}
            >
              {recipe.difficulty}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-mono">by {recipe.author}</p>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleCopy(e);
                }}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
