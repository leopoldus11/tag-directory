import { Recipe, RecipeMetadata } from "@/types/recipe";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "recipes");

/**
 * Get all recipe files from the data directory
 */
export function getAllRecipeFiles(): string[] {
  if (!fs.existsSync(DATA_DIR)) {
    return [];
  }
  
  return fs.readdirSync(DATA_DIR).filter((file) => {
    return file.endsWith(".json") || file.endsWith(".mdc");
  });
}

/**
 * Load a single recipe by filename
 */
export function getRecipeByFile(filename: string): Recipe | null {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    
    if (filename.endsWith(".json")) {
      return JSON.parse(fileContent) as Recipe;
    } else if (filename.endsWith(".mdc")) {
      // Parse MDC (Markdown with frontmatter) format
      const { parseMDC } = require("./mdc-parser");
      return parseMDC(fileContent);
    }
    
    return null;
  } catch (error) {
    console.error(`Error loading recipe ${filename}:`, error);
    return null;
  }
}

/**
 * Get all recipes with metadata only (for listing)
 */
export function getAllRecipesMetadata(): RecipeMetadata[] {
  const files = getAllRecipeFiles();
  const recipes: RecipeMetadata[] = [];
  
  for (const file of files) {
    const recipe = getRecipeByFile(file);
    if (recipe) {
      recipes.push({
        id: recipe.id,
        name: recipe.name,
        platform: recipe.platform,
        difficulty: recipe.difficulty,
        author: recipe.author,
        description: recipe.description,
        tags: recipe.tags,
        vendor: recipe.vendor,
        vendorIcon: recipe.vendorIcon,
      });
    }
  }
  
  return recipes;
}

/**
 * Get all recipes (full data)
 */
export function getAllRecipes(): Recipe[] {
  const files = getAllRecipeFiles();
  return files
    .map((file) => getRecipeByFile(file))
    .filter((recipe): recipe is Recipe => recipe !== null);
}

/**
 * Get a single recipe by ID
 */
export function getRecipeById(id: string): Recipe | null {
  const files = getAllRecipeFiles();
  for (const file of files) {
    const recipe = getRecipeByFile(file);
    if (recipe && recipe.id === id) {
      return recipe;
    }
  }
  return null;
}

