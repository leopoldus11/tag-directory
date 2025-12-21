#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { Script } from "../types/script";

const SCRIPTS_DIR = path.join(process.cwd(), "data", "scripts");
const REQUIRED_FIELDS = ["id", "name", "platform", "codeSnippet", "author", "difficulty"];
const VALID_PLATFORMS = ["GA4", "Meta", "Consent", "Server-Side", "GTM", "Adobe Launch", "Other"];
const VALID_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

interface ValidationError {
  file: string;
  error: string;
}

const errors: ValidationError[] = [];
const ids: Set<string> = new Set();

function validateScript(script: Script, filename: string): void {
  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!script[field as keyof Script]) {
      errors.push({
        file: filename,
        error: `Missing required field: ${field}`,
      });
    }
  }

  // Validate platform
  if (script.platform && !VALID_PLATFORMS.includes(script.platform)) {
    errors.push({
      file: filename,
      error: `Invalid platform: ${script.platform}. Must be one of: ${VALID_PLATFORMS.join(", ")}`,
    });
  }

  // Validate difficulty
  if (script.difficulty && !VALID_DIFFICULTIES.includes(script.difficulty)) {
    errors.push({
      file: filename,
      error: `Invalid difficulty: ${script.difficulty}. Must be one of: ${VALID_DIFFICULTIES.join(", ")}`,
    });
  }

  // Validate ID format
  if (script.id) {
    if (!/^[a-z0-9-]+$/.test(script.id)) {
      errors.push({
        file: filename,
        error: `Invalid ID format: ${script.id}. Must be lowercase alphanumeric with hyphens only.`,
      });
    }

    // Check for duplicate IDs
    if (ids.has(script.id)) {
      errors.push({
        file: filename,
        error: `Duplicate ID: ${script.id}`,
      });
    }
    ids.add(script.id);
  }

  // Validate code snippet is not empty
  if (script.codeSnippet && script.codeSnippet.trim().length === 0) {
    errors.push({
      file: filename,
      error: "Code snippet cannot be empty",
    });
  }
}

function main() {
  if (!fs.existsSync(SCRIPTS_DIR)) {
    console.log(`Scripts directory not found: ${SCRIPTS_DIR} (this is OK if no scripts exist yet)`);
    process.exit(0);
  }

  const files = fs.readdirSync(SCRIPTS_DIR).filter(
    (file) => file.endsWith(".json") || file.endsWith(".mdc")
  );

  if (files.length === 0) {
    console.log("No script files found.");
    process.exit(0);
  }

  for (const file of files) {
    try {
      const filePath = path.join(SCRIPTS_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");

      let script: Script;
      if (file.endsWith(".json")) {
        script = JSON.parse(content) as Script;
      } else {
        // For now, scripts use same MDC parser as recipes
        const { parseMDC } = require("../lib/mdc-parser");
        script = parseMDC(content) as unknown as Script;
      }

      validateScript(script, file);
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

  console.log(`✅ All ${files.length} script(s) validated successfully!`);
}

main();

