"use client";

import { Recipe } from "@/types/recipe";

/**
 * Client-side recipe loading
 * This fetches recipes from an API route or uses pre-loaded data
 */
export async function getRecipeByIdClient(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`/api/recipes/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading recipe ${id}:`, error);
    return null;
  }
}

