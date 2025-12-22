#!/usr/bin/env tsx

/**
 * Validation script for blueprints
 * Validates all blueprint files against the Zod schema
 */

import { TrackingBlueprintSchema } from "../lib/schemas/blueprint";
import { getAllBlueprints } from "../lib/blueprints";
import fs from "fs";
import path from "path";

const BLUEPRINTS_DIR = path.join(process.cwd(), "src", "content", "blueprints");
const RECIPES_DIR = path.join(process.cwd(), "data", "recipes");

function validateBlueprints() {
  console.log("🔍 Validating blueprints...\n");

  const blueprints = getAllBlueprints();
  let errors = 0;
  let warnings = 0;

  if (blueprints.length === 0) {
    console.log("⚠️  No blueprints found. This is okay if you're just starting out.\n");
    return { errors: 0, warnings: 0 };
  }

  console.log(`Found ${blueprints.length} blueprint(s)\n`);

  // Check for duplicates
  const ids = new Map<string, string[]>();
  blueprints.forEach((blueprint) => {
    if (!ids.has(blueprint.id)) {
      ids.set(blueprint.id, []);
    }
    ids.get(blueprint.id)!.push(blueprint.slug);
  });

  ids.forEach((slugs, id) => {
    if (slugs.length > 1) {
      console.error(`❌ Duplicate ID found: "${id}" used in: ${slugs.join(", ")}`);
      errors++;
    }
  });

  // Validate each blueprint
  blueprints.forEach((blueprint) => {
    const result = TrackingBlueprintSchema.safeParse(blueprint);
    
    if (!result.success) {
      console.error(`❌ Validation failed for "${blueprint.id}":`);
      result.error.issues.forEach((err) => {
        console.error(`   - ${err.path.join(".")}: ${err.message}`);
      });
      errors++;
    } else {
      // Check for common issues
      if (!blueprint.description || blueprint.description.trim().length === 0) {
        console.warn(`⚠️  "${blueprint.id}": Missing description`);
        warnings++;
      }
      if (!blueprint.content || blueprint.content.trim().length === 0) {
        console.error(`❌ "${blueprint.id}": Missing content`);
        errors++;
      }
      if (blueprint.author === "your-github-username" || blueprint.author === "YOUR_USERNAME") {
        console.warn(`⚠️  "${blueprint.id}": Author is placeholder`);
        warnings++;
      }
    }
  });

  console.log("\n" + "=".repeat(50));
  if (errors === 0 && warnings === 0) {
    console.log("✅ All blueprints are valid!\n");
  } else {
    console.log(`\n📊 Summary:`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Warnings: ${warnings}\n`);
  }

  return { errors, warnings };
}

// Run validation
const result = validateBlueprints();
process.exit(result.errors > 0 ? 1 : 0);

