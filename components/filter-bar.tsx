"use client";

import { Difficulty } from "@/types/recipe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedDifficulties: Difficulty[];
  onDifficultyToggle: (difficulty: Difficulty) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

export function FilterBar({
  selectedDifficulties,
  onDifficultyToggle,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  const hasActiveFilters = selectedDifficulties.length > 0 || searchQuery.length > 0;

  const clearFilters = () => {
    selectedDifficulties.forEach((d) => {
      if (selectedDifficulties.includes(d)) {
        onDifficultyToggle(d);
      }
    });
    onSearchChange("");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Difficulty:</span>
        {difficulties.map((difficulty) => (
          <Badge
            key={difficulty}
            variant={selectedDifficulties.includes(difficulty) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors",
              selectedDifficulties.includes(difficulty) &&
                "bg-primary text-primary-foreground"
            )}
            onClick={() => onDifficultyToggle(difficulty)}
          >
            {difficulty}
          </Badge>
        ))}
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-xs"
          onClick={clearFilters}
        >
          <X className="h-3 w-3" />
          Clear filters
        </Button>
      )}
    </div>
  );
}

