"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  const hasActiveFilters = searchQuery.length > 0;

  const clearFilters = () => {
    onSearchChange("");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-xs"
          onClick={clearFilters}
        >
          <X className="h-3 w-3" />
          Clear search
        </Button>
      )}
    </div>
  );
}

