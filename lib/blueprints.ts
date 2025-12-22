import { TrackingBlueprint, TrackingBlueprintSchema } from "./schemas/blueprint";
import fs from "fs";
import path from "path";
import { parseMDC } from "./mdc-parser";

const BLUEPRINTS_DIR = path.join(process.cwd(), "src", "content", "blueprints");
const RECIPES_DIR = path.join(process.cwd(), "data", "recipes"); // Legacy support

/**
 * Get all blueprint files
 */
export function getAllBlueprintFiles(): string[] {
  const files: string[] = [];
  
  // Check new blueprints directory
  if (fs.existsSync(BLUEPRINTS_DIR)) {
    const blueprintFiles = fs.readdirSync(BLUEPRINTS_DIR).filter(
      (file) => file.endsWith(".json") || file.endsWith(".mdc")
    );
    files.push(...blueprintFiles.map(f => path.join("blueprints", f)));
  }
  
  // Also check legacy recipes directory for migration
  if (fs.existsSync(RECIPES_DIR)) {
    const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(
      (file) => file.endsWith(".json") || file.endsWith(".mdc")
    );
    files.push(...recipeFiles.map(f => path.join("recipes", f)));
  }
  
  return files;
}

/**
 * Load a blueprint by file path
 */
function loadBlueprintFile(filePath: string, isLegacy: boolean = false): TrackingBlueprint | null {
  try {
    const fullPath = isLegacy 
      ? path.join(process.cwd(), "data", "recipes", filePath)
      : path.join(BLUEPRINTS_DIR, filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    
    let blueprint: Partial<TrackingBlueprint>;
    
    if (filePath.endsWith(".json")) {
      const parsed = JSON.parse(content);
      // If it's a legacy recipe (has 'name' instead of 'title'), convert it
      if (parsed.name && !parsed.title) {
        blueprint = convertRecipeToBlueprint(parsed);
      } else {
        blueprint = parsed;
      }
    } else if (filePath.endsWith(".mdc")) {
      // Parse MDC and convert to blueprint format
      const recipe = parseMDC(content);
      blueprint = convertRecipeToBlueprint(recipe);
    } else {
      return null;
    }
    
    // Generate slug if not present
    if (!blueprint.slug && blueprint.id) {
      blueprint.slug = blueprint.id;
    }
    
    // Set defaults for required fields
    if (!blueprint.type) {
      blueprint.type = determineType(blueprint as any);
    }
    if (!blueprint.community_verified) {
      blueprint.community_verified = false;
    }
    
    // Set filePath if not already set (for GitHub link)
    if (!blueprint.filePath) {
      blueprint.filePath = isLegacy
        ? `data/recipes/${filePath}`
        : `src/content/blueprints/${filePath}`;
    }
    
    // Validate with Zod (use safeParse to handle legacy data)
    const result = TrackingBlueprintSchema.safeParse(blueprint);
    if (!result.success) {
      console.error(`Validation error for ${filePath}:`, result.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.error(`Error loading blueprint ${filePath}:`, error);
    return null;
  }
}

/**
 * Convert legacy Recipe format to Blueprint format
 */
function convertRecipeToBlueprint(recipe: any): Partial<TrackingBlueprint> {
  return {
    id: recipe.id,
    slug: recipe.id, // Use ID as slug
    title: recipe.name,
    author: recipe.author,
    platform: recipe.platform as any,
    type: determineType(recipe),
    content: recipe.codeSnippet,
    community_verified: false,
    description: recipe.description,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    trigger: recipe.trigger,
    condition: recipe.condition,
    vendor: recipe.vendor,
    vendorIcon: recipe.vendorIcon,
    createdAt: recipe.createdAt,
    updatedAt: recipe.updatedAt,
  };
}

/**
 * Determine blueprint type from recipe
 */
function determineType(recipe: any): "Tag" | "Rule" | "Snippet" {
  // Logic to determine type based on recipe properties
  if (recipe.trigger && recipe.condition) {
    return "Rule"; // Has trigger + condition = Rule (Adobe Launch style)
  }
  if (recipe.trigger) {
    return "Tag"; // Has trigger = Tag (GTM style)
  }
  return "Snippet"; // Just code = Snippet
}

/**
 * Get all blueprints
 */
export function getAllBlueprints(): TrackingBlueprint[] {
  const files = getAllBlueprintFiles();
  const blueprints: TrackingBlueprint[] = [];
  
  for (const file of files) {
    const isLegacy = file.startsWith("recipes/");
    const blueprint = loadBlueprintFile(file.replace("recipes/", "").replace("blueprints/", ""), isLegacy);
    if (blueprint) {
      blueprints.push(blueprint);
    }
  }
  
  return blueprints;
}

/**
 * Get blueprint by slug
 */
export function getBlueprintBySlug(slug: string): TrackingBlueprint | null {
  const blueprints = getAllBlueprints();
  return blueprints.find((b) => b.slug === slug) || null;
}

/**
 * Get blueprints by platform
 */
export function getBlueprintsByPlatform(platform: string): TrackingBlueprint[] {
  return getAllBlueprints().filter((b) => b.platform === platform);
}

/**
 * Get blueprints by use case
 */
export function getBlueprintsByUseCase(useCase: string): TrackingBlueprint[] {
  return getAllBlueprints().filter((b) => b.useCase === useCase);
}

