"use client";

import { useState, useMemo } from "react";
import { RecipeCard } from "@/components/recipe-card";
import { FilterBar } from "@/components/filter-bar";
import { Difficulty, RecipeMetadata } from "@/types/recipe";
import { useFilters } from "./sidebar-wrapper";

interface RecipeGridProps {
  initialRecipes: RecipeMetadata[];
  showFilters?: boolean;
}

export function RecipeGrid({ initialRecipes, showFilters = true }: RecipeGridProps) {
  const { selectedPlatform, selectedUseCase } = useFilters();
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // High-performance filtering using useMemo
  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      // Platform filter
      if (selectedPlatform !== "All" && recipe.platform !== selectedPlatform) {
        return false;
      }

      // Use Case filter (if recipe has useCase property)
      if (selectedUseCase !== "All") {
        const recipeUseCase = (recipe as any).useCase;
        if (recipeUseCase && recipeUseCase !== selectedUseCase) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(recipe.difficulty)) {
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
  }, [initialRecipes, selectedPlatform, selectedUseCase, selectedDifficulties, searchQuery]);

  const handleDifficultyToggle = (difficulty: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <>
      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <FilterBar
            selectedDifficulties={selectedDifficulties}
            onDifficultyToggle={handleDifficultyToggle}
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
