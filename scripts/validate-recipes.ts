#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Recipe } from "../types/recipe";
import { parseMDC } from "../lib/mdc-parser";

const RECIPES_DIR = path.join(process.cwd(), "data", "recipes");
const REQUIRED_FIELDS = ["id", "name", "platform", "trigger", "codeSnippet", "author", "difficulty"];
const VALID_PLATFORMS = ["GA4", "Meta", "Consent", "Server-Side", "GTM", "Adobe Launch", "Other"];
const VALID_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

interface ValidationError {
  file: string;
  error: string;
}

const errors: ValidationError[] = [];
const ids: Set<string> = new Set();

function validateRecipe(recipe: Recipe, filename: string): void {
  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!recipe[field as keyof Recipe]) {
      errors.push({
        file: filename,
        error: `Missing required field: ${field}`,
      });
    }
  }

  // Validate platform
  if (recipe.platform && !VALID_PLATFORMS.includes(recipe.platform)) {
    errors.push({
      file: filename,
      error: `Invalid platform: ${recipe.platform}. Must be one of: ${VALID_PLATFORMS.join(", ")}`,
    });
  }

  // Validate difficulty
  if (recipe.difficulty && !VALID_DIFFICULTIES.includes(recipe.difficulty)) {
    errors.push({
      file: filename,
      error: `Invalid difficulty: ${recipe.difficulty}. Must be one of: ${VALID_DIFFICULTIES.join(", ")}`,
    });
  }

  // Validate ID format
  if (recipe.id) {
    if (!/^[a-z0-9-]+$/.test(recipe.id)) {
      errors.push({
        file: filename,
        error: `Invalid ID format: ${recipe.id}. Must be lowercase alphanumeric with hyphens only.`,
      });
    }

    // Check for duplicate IDs
    if (ids.has(recipe.id)) {
      errors.push({
        file: filename,
        error: `Duplicate ID: ${recipe.id}`,
      });
    }
    ids.add(recipe.id);
  }

  // Validate code snippet is not empty
  if (recipe.codeSnippet && recipe.codeSnippet.trim().length === 0) {
    errors.push({
      file: filename,
      error: "Code snippet cannot be empty",
    });
  }
}

function main() {
  if (!fs.existsSync(RECIPES_DIR)) {
    console.error(`Recipes directory not found: ${RECIPES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(RECIPES_DIR).filter(
    (file) => file.endsWith(".json") || file.endsWith(".mdc")
  );

  if (files.length === 0) {
    console.log("No recipe files found.");
    process.exit(0);
  }

  for (const file of files) {
    try {
      const filePath = path.join(RECIPES_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");

      let recipe: Recipe;
      if (file.endsWith(".json")) {
        recipe = JSON.parse(content) as Recipe;
      } else {
        recipe = parseMDC(content);
      }

      validateRecipe(recipe, file);
    } catch (error) {
      errors.push({
        file,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  if (errors.length > 0) {
    console.error("\n❌ Validation failed:\n");
    errors.forEach(({ file, error }) => {
      console.error(`  ${file}: ${error}`);
    });
    process.exit(1);
  }

  console.log(`✅ All ${files.length} recipe(s) validated successfully!`);
}

main();

