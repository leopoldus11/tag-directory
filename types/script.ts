import { Platform, Difficulty } from "./recipe";

/**
 * Scripts are reusable code snippets that can be implemented
 * as Custom Code in Recipes (GTM tags, Adobe Launch rules, etc.)
 */
export interface Script {
  id: string;
  name: string;
  platform: Platform;
  codeSnippet: string;
  author: string;
  difficulty: Difficulty;
  description?: string;
  tags?: string[];
  vendor?: string;
  vendorIcon?: string;
  createdAt?: string;
  updatedAt?: string;
  // Scripts can be used in multiple recipes
  usedInRecipes?: string[];
}

export interface ScriptMetadata {
  id: string;
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  author: string;
  description?: string;
  tags?: string[];
  vendor?: string;
  vendorIcon?: string;
}

