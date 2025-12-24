"use client";

import { useState, useMemo, type ReactNode } from "react";
import { RecipeCard } from "@/components/recipe-card";
import { FilterBar } from "@/components/filter-bar";
import { RecipeMetadata } from "@/types/recipe";
import { useFilters } from "./sidebar-wrapper";

interface RecipeGridProps {
  initialRecipes: RecipeMetadata[];
  showFilters?: boolean;
  adSlot?: ReactNode;
}

export function RecipeGrid({ initialRecipes, showFilters = true, adSlot }: RecipeGridProps) {
  const { selectedPlatform } = useFilters();
  const [searchQuery, setSearchQuery] = useState("");

  // High-performance filtering using useMemo
  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      // Platform filter
      if (selectedPlatform !== "All" && recipe.platform !== selectedPlatform) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = recipe.name.toLowerCase().includes(query);
        const matchesDescription = recipe.description?.toLowerCase().includes(query);
        const matchesPlatform = recipe.platform.toLowerCase().includes(query);
        const matchesTags = recipe.tags?.some((tag) => tag.toLowerCase().includes(query));
        const matchesAuthor = recipe.author.toLowerCase().includes(query);

        if (!matchesName && !matchesDescription && !matchesPlatform && !matchesTags && !matchesAuthor) {
          return false;
        }
      }

      return true;
    });
  }, [initialRecipes, selectedPlatform, searchQuery]);

  return (
    <>
      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      )}

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 items-start">
          {filteredRecipes.map((recipe, idx) => {
            // Ad placement logic: first ad after 2nd card (before idx 2), then every 9th card after that
            // Pattern: after card 2 (idx 1), then after card 11 (idx 10), card 20 (idx 19), etc.
            const shouldShowAd = adSlot && (
              idx === 2 || // After 2nd card (show ad before 3rd card)
              (idx > 2 && (idx - 2) % 9 === 0) // Then every 9th card after that
            );

            return (
              <>
                {/* Inject ad slot at calculated positions */}
                {shouldShowAd && (
                  <div className="hidden xl:block" key={`ad-${idx}`}>{adSlot}</div>
                )}
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  type="recipe"
                />
              </>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-muted-foreground">No recipes found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </>
  );
}
