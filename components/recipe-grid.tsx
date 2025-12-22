"use client";

import { useState, useMemo } from "react";
import { RecipeCard } from "@/components/recipe-card";
import { FilterBar } from "@/components/filter-bar";
import { RecipeMetadata } from "@/types/recipe";
import { useFilters } from "./sidebar-wrapper";

interface RecipeGridProps {
  initialRecipes: RecipeMetadata[];
  showFilters?: boolean;
}

export function RecipeGrid({ initialRecipes, showFilters = true }: RecipeGridProps) {
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              type="recipe"
            />
          ))}
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
