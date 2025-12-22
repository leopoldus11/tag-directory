import { z } from "zod";

export const PlatformSchema = z.enum([
  "GTM",
  "Adobe Launch",
  "Tealium",
  "GA4",
  "Meta",
  "Consent",
  "Server-Side",
  "Other",
]);

export const BlueprintTypeSchema = z.enum(["Tag", "Rule", "Snippet"]);

// Trigger schema for platform-specific triggers
export const TriggerSchema = z.object({
  name: z.string(),
  type: z.string(), // e.g., "Page View", "Custom Event", "Click"
  description: z.string().optional(),
  event: z.string().optional(), // For custom events
  conditions: z.array(z.string()).optional(), // Additional trigger conditions
});

// Condition/Exception schema
export const ConditionSchema = z.object({
  name: z.string().optional(),
  condition: z.string(), // The actual condition logic
  description: z.string().optional(),
});

// Exception schema (for GTM - conditions that prevent firing)
export const ExceptionSchema = z.object({
  name: z.string().optional(),
  condition: z.string(), // Condition that prevents the tag from firing
  description: z.string().optional(),
});

export const TrackingBlueprintSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"), // GitHub username
  platform: PlatformSchema,
  type: BlueprintTypeSchema,
  content: z.string().min(1, "Content is required"), // Markdown or Code
  community_verified: z.boolean().default(false),
  
  // Optional fields
  description: z.string().optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  tags: z.array(z.string()).optional(),
  vendor: z.string().optional(),
  vendorIcon: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  useCase: z.enum(["Ecommerce", "Consent", "UX", "Analytics", "Advertising", "Other"]).optional(),
  
  // Legacy fields (for backward compatibility)
  trigger: z.string().optional(), // Single trigger as string (deprecated, use triggers array)
  condition: z.string().optional(), // Single condition as string (deprecated, use conditions array)
  
  // Enhanced fields for platform-specific configurations
  tagType: z.string().optional(), // For GTM: "Custom HTML", "Google Analytics: GA4 Event", etc.
  triggers: z.array(TriggerSchema).optional(), // Array of triggers (replaces single trigger)
  conditions: z.array(ConditionSchema).optional(), // Array of conditions (for Adobe Launch/Tealium)
  exceptions: z.array(ExceptionSchema).optional(), // Array of exceptions (for GTM - prevents firing)
  executionOrder: z.number().optional(), // Order of execution when multiple rules use same trigger
  
  // File path for GitHub link
  filePath: z.string().optional(), // Path to source file, e.g., "src/content/blueprints/example.json"
  
  // Additional platform-specific configuration
  additionalConfig: z.record(z.string(), z.any()).optional(), // Flexible object for platform-specific settings
});

export type TrackingBlueprint = z.infer<typeof TrackingBlueprintSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type BlueprintType = z.infer<typeof BlueprintTypeSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;
export type Condition = z.infer<typeof ConditionSchema>;
export type Exception = z.infer<typeof ExceptionSchema>;

