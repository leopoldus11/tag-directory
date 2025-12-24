export type Platform = "GA4" | "Meta" | "Consent" | "Server-Side" | "GTM" | "Adobe Launch" | "Tealium" | "Other";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Recipe {
  id: string;
  name: string;
  platform: Platform;
  trigger: string;
  condition?: string;
  codeSnippet: string;
  author: string;
  difficulty: Difficulty;
  description?: string;
  tags?: string[];
  vendor?: string;
  vendorIcon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RecipeMetadata {
  id: string;
  name: string;
  platform: Platform;
  difficulty: Difficulty;
  author: string;
  description?: string;
  tags?: string[];
  vendor?: string;
  vendorIcon?: string;
  // Optional code preview for tags (script content)
  codeSnippet?: string;
}

