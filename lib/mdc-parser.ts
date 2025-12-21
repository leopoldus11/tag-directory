import { Recipe } from "@/types/recipe";

/**
 * Parse MDC (Markdown with frontmatter) format
 * Format:
 * ---
 * key: value
 * ---
 * content
 */
export function parseMDC(content: string): Recipe {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error("Invalid MDC format: missing frontmatter");
  }

  const frontmatter = match[1];
  const body = match[2].trim();

  // Parse frontmatter (simple key: value format)
  const metadata: Record<string, string> = {};
  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      metadata[key] = value;
    }
  });

  // Build recipe object
  const recipe: Recipe = {
    id: metadata.id || "",
    name: metadata.name || "",
    platform: metadata.platform as Recipe["platform"] || "Other",
    trigger: metadata.trigger || "",
    condition: metadata.condition,
    codeSnippet: body,
    author: metadata.author || "",
    difficulty: (metadata.difficulty as Recipe["difficulty"]) || "Beginner",
    description: metadata.description,
    tags: metadata.tags ? metadata.tags.split(",").map((t) => t.trim()) : [],
    vendor: metadata.vendor,
    vendorIcon: metadata.vendorIcon,
    createdAt: metadata.createdAt,
    updatedAt: metadata.updatedAt,
  };

  return recipe;
}

