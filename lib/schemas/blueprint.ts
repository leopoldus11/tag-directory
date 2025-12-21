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
  trigger: z.string().optional(),
  condition: z.string().optional(),
  vendor: z.string().optional(),
  vendorIcon: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  useCase: z.enum(["Ecommerce", "Consent", "UX", "Analytics", "Other"]).optional(),
});

export type TrackingBlueprint = z.infer<typeof TrackingBlueprintSchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type BlueprintType = z.infer<typeof BlueprintTypeSchema>;

