"use client";

import { RecipeMetadata } from "@/types/recipe";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export function RecipeCard({ recipe, onView, type = "recipe" }: RecipeCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  // Use tags route for recipes
  const href = type === "recipe" ? `/tags/${recipe.id}` : `/${type}s/${recipe.id}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}${href}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <Link href={href}>
      <Card className="group relative flex flex-col cursor-pointer border border-border bg-background-subtle transition-all hover:border-border-hover hover:bg-background-muted h-[500px]">
        <CardHeader className="pb-3 flex-shrink-0 px-4 pt-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="mb-1.5 line-clamp-2 text-base font-semibold leading-tight tracking-tight text-foreground">
              {recipe.name}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm text-foreground-muted leading-normal">
              {recipe.description || "No description available"}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4 px-4 flex-1 flex flex-col overflow-hidden">
          {/* Code preview for tags with script content */}
          {recipe.codeSnippet && (
            <div className="group/code relative flex-1 rounded-md border border-border-muted bg-background px-3 py-2 text-xs font-mono text-foreground-muted overflow-y-auto custom-scrollbar mb-3">
              {/* Action buttons inside code container */}
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 transition-opacity group-hover/code:opacity-100 z-10">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-md bg-background-elevated border border-border hover:bg-interactive-hover hover:border-border-hover"
                  onClick={handleCopyLink}
                  aria-label={copiedLink ? "Link copied" : "Copy link to tag"}
                >
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 rounded-md bg-background-elevated border border-border hover:bg-interactive-hover hover:border-border-hover"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(href, '_blank');
                  }}
                  aria-label="Open tag in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-[11px] leading-relaxed pr-12">
                {recipe.codeSnippet}
              </pre>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 flex-shrink-0">
            <p className="text-xs text-foreground-subtle font-mono">
              {Array.isArray(recipe.author) ? recipe.author.join(', ') : recipe.author}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
