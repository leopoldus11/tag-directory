#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Recipe } from "../types/recipe";
import { Script } from "../types/script";
import { parseMDC } from "../lib/mdc-parser";

const RECIPES_DIR = path.join(process.cwd(), "data", "recipes");
const SCRIPTS_DIR = path.join(process.cwd(), "data", "scripts");

const allIds: Map<string, string> = new Map(); // id -> file path
const errors: string[] = [];

function loadRecipes() {
  if (!fs.existsSync(RECIPES_DIR)) return;

  const files = fs.readdirSync(RECIPES_DIR).filter(
    (file) => file.endsWith(".json") || file.endsWith(".mdc")
  );

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

      if (recipe.id) {
        if (allIds.has(recipe.id)) {
          errors.push(
            `Duplicate ID "${recipe.id}" found in:\n  - ${allIds.get(recipe.id)}\n  - ${filePath}`
          );
        } else {
          allIds.set(recipe.id, filePath);
        }
      }
    } catch (error) {
      // Skip invalid files, validation script will catch them
    }
  }
}

function loadScripts() {
  if (!fs.existsSync(SCRIPTS_DIR)) return;

  const files = fs.readdirSync(SCRIPTS_DIR).filter(
    (file) => file.endsWith(".json") || file.endsWith(".mdc")
  );

  for (const file of files) {
    try {
      const filePath = path.join(SCRIPTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");

      let script: Script;
      if (file.endsWith(".json")) {
        script = JSON.parse(content) as Script;
      } else {
        const { parseMDC } = require("../lib/mdc-parser");
        script = parseMDC(content) as unknown as Script;
      }

      if (script.id) {
        if (allIds.has(script.id)) {
          errors.push(
            `Duplicate ID "${script.id}" found in:\n  - ${allIds.get(script.id)}\n  - ${filePath}`
          );
        } else {
          allIds.set(script.id, filePath);
        }
      }
    } catch (error) {
      // Skip invalid files, validation script will catch them
    }
  }
}

function main() {
  loadRecipes();
  loadScripts();

  if (errors.length > 0) {
    console.error("\n❌ Duplicate IDs found:\n");
    errors.forEach((error) => console.error(`  ${error}\n`));
    process.exit(1);
  }

  console.log(`✅ No duplicate IDs found. Total unique IDs: ${allIds.size}`);
}

main();

