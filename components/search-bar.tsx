"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { RecipeMetadata } from "@/types/recipe";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  recipes: RecipeMetadata[];
  onSelect?: (recipeId: string) => void;
}

export function SearchBar({ recipes, onSelect }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (recipeId: string) => {
    setOpen(false);
    if (onSelect) {
      onSelect(recipeId);
    } else {
      router.push(`/recipes/${recipeId}`);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for recipes and scripts..."
          className="pl-10 pr-20 h-12 bg-background border-border/50 focus:border-border text-base"
          onClick={() => setOpen(true)}
          readOnly
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-6 select-none items-center gap-1 rounded border bg-muted/50 px-2 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for recipes and scripts..." />
        <CommandList>
          <CommandEmpty>No recipes found.</CommandEmpty>
          <CommandGroup heading="Recipes">
            {recipes.map((recipe) => (
              <CommandItem
                key={recipe.id}
                value={recipe.name}
                onSelect={() => handleSelect(recipe.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{recipe.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {recipe.platform} • {recipe.difficulty}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
