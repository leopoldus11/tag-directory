import { z } from "zod";

/**
 * Unified Tag Schema
 * This is the base schema that all platform-specific tags extend
 */
export const BaseTagSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title: z.string().min(1, "Title is required"),
  author: z.union([
    z.string().min(1, "Author is required"),
    z.array(z.string()).min(1, "At least one author is required")
  ]), // Support single or multiple authors
  platform: z.enum(["GTM", "Adobe Launch", "Tealium", "GA4", "Meta", "Consent", "Server-Side", "Other"]),
  content: z.string().min(1, "Content is required"), // Markdown or Code
  community_verified: z.boolean().default(false),
  
  // Optional metadata
  description: z.string().optional(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  tags: z.array(z.string()).optional(),
  vendor: z.string().optional(),
  vendorIcon: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  useCase: z.enum(["Ecommerce", "Consent", "UX", "Analytics", "Advertising", "Other"]).optional(),
  
  // File path for GitHub link
  filePath: z.string().optional(),
});

/**
 * GTM-Specific Schema
 * Google Tag Manager uses: Triggers, Trigger Conditions, Tag Exceptions
 */
export const GTMTriggerConditionSchema = z.object({
  variable: z.string().optional(), // e.g., "Page URL", "Click Element", "Data Layer Variable" (optional for flexibility)
  operator: z.string().optional(), // User-defined operator (e.g., "contains", "equals", custom logic)
  value: z.string().optional(), // The value to compare against (optional for custom code conditions)
  condition: z.string().optional(), // Custom condition logic (JavaScript expression) - alternative to variable/operator/value
  description: z.string().optional(), // Human-readable explanation
  // Note: User can provide either (variable + operator + value) OR (condition) for maximum flexibility
});

export const GTMTriggerSchema = z.object({
  name: z.string(), // Human-readable name, e.g., "All Pages", "Product Page View"
  type: z.string(), // User-defined trigger type (e.g., "Page View", "Custom Event", "Click", etc.)
  eventName: z.string().optional(), // For Custom Event triggers, the actual event name to listen for
  description: z.string().optional(), // Human-readable explanation
  conditions: z.array(GTMTriggerConditionSchema).optional(), // Trigger firing conditions (filters)
  // Note: In GTM, trigger conditions act as filters - ALL conditions must be true for trigger to fire
});

export const GTMExceptionSchema = z.object({
  name: z.string().optional(), // Human-readable name
  condition: z.string(), // The actual condition logic (JavaScript expression or GTM condition)
  description: z.string().optional(), // Human-readable explanation
});

export const GTMTagSchema = BaseTagSchema.extend({
  type: z.literal("Tag"), // GTM uses "Tag"
  tagType: z.string(), // e.g., "Custom HTML", "Google Analytics: GA4 Event", "Universal Analytics", etc.
  triggers: z.array(GTMTriggerSchema).min(1, "At least one trigger is required"),
  exceptions: z.array(GTMExceptionSchema).optional(), // Tag-level exceptions (prevents tag from firing)
  executionOrder: z.number().optional(), // For tag priority
});

/**
 * Adobe Launch-Specific Schema
 * Adobe Launch uses: Events, Conditions, Actions
 * Note: In our schema, we're storing the Rule configuration, not individual Actions
 */
export const AdobeLaunchEventSchema = z.object({
  name: z.string(), // Human-readable name, e.g., "Consent Update", "Page Load"
  type: z.string(), // User-defined event type (e.g., "Page Load", "Custom Event", "DOM Ready", etc.)
  eventName: z.string().optional(), // For Custom Events, the actual event name (e.g., "CookiebotConsentUpdate")
  description: z.string().optional(), // Human-readable explanation
  // Note: Multiple events use OR logic - rule fires if ANY event occurs
});

export const AdobeLaunchConditionSchema = z.object({
  name: z.string().optional(), // Human-readable name
  type: z.string().optional(), // User-defined condition type (e.g., "Value Comparison", "Custom Code", "Exception", etc.)
  condition: z.string(), // The actual condition logic (JavaScript expression that must return true)
  description: z.string().optional(), // Human-readable explanation
  // Note: Multiple conditions use AND logic - ALL conditions must return true for the rule to execute actions
});

export const AdobeLaunchRuleSchema = BaseTagSchema.extend({
  type: z.literal("Rule"), // Adobe Launch uses "Rule"
  events: z.array(AdobeLaunchEventSchema).min(1, "At least one event is required"), // Adobe Launch calls them "Events", not "Triggers"
  conditions: z.array(AdobeLaunchConditionSchema).optional(), // Rule-level conditions (ALL must be true)
  executionOrder: z.number().optional(), // Rule execution order
});

/**
 * Union type for all tag schemas
 */
export const TagSchema = z.discriminatedUnion("platform", [
  GTMTagSchema,
  AdobeLaunchRuleSchema,
  // Future: TealiumSchema, etc.
]);

export type Tag = z.infer<typeof TagSchema>;
export type GTMTag = z.infer<typeof GTMTagSchema>;
export type AdobeLaunchRule = z.infer<typeof AdobeLaunchRuleSchema>;
export type GTMTrigger = z.infer<typeof GTMTriggerSchema>;
export type AdobeLaunchEvent = z.infer<typeof AdobeLaunchEventSchema>;
export type GTMTriggerCondition = z.infer<typeof GTMTriggerConditionSchema>;
export type AdobeLaunchCondition = z.infer<typeof AdobeLaunchConditionSchema>;
export type GTMException = z.infer<typeof GTMExceptionSchema>;

