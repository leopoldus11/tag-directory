# Tag Structure Design: Coherent, Flexible & SEO-Friendly

## The Core Challenge

**Problem**: GTM and Adobe Launch have fundamentally different structures, but we need:
1. **Coherent structure** - Easy to understand at a glance
2. **Flexible schema** - Handles platform differences gracefully
3. **SEO-friendly** - Discoverable on Google
4. **User-friendly** - Clear what the tag does and how to use it

---

## Understanding Platform Differences

### Google Tag Manager (GTM)
```
Tag Structure:
├── Tag Type (e.g., "Google Analytics: GA4 Event", "Custom HTML")
├── Code/Content (HTML, JavaScript, or configuration)
├── Triggers (WHEN to fire)
│   ├── Trigger Type (Page View, Click, Custom Event, etc.)
│   └── Trigger Conditions (filters - ALL must be true)
├── Exceptions (WHEN NOT to fire - prevents tag from firing)
└── Execution Order (priority)
```

**Logic**: Tag fires when trigger fires AND no exceptions match

### Adobe Launch
```
Rule Structure:
├── Events (WHEN to fire - ANY event can trigger, OR logic)
│   └── Event Type (Page Load, Custom Event, DOM Ready, etc.)
├── Conditions (WHEN to execute - ALL must be true, AND logic)
│   └── Condition Type (Value Comparison, Custom Code, Exception, etc.)
└── Actions (WHAT to do)
    ├── Extensions (e.g., "Send Beacon", "Set Variables")
    └── Custom Code (JavaScript)
```

**Logic**: Rule fires when ANY event occurs AND ALL conditions are true, then executes actions

### Key Differences
| Aspect | GTM | Adobe Launch |
|--------|-----|--------------|
| **Trigger Logic** | Single trigger (with filters) | Multiple events (OR logic) |
| **Condition Logic** | Trigger conditions (AND) | Rule conditions (AND) |
| **Prevention** | Exceptions (tag-level) | Exception conditions (rule-level) |
| **Actions** | Built into tag type | Separate actions/extensions |
| **Code Location** | Tag content | Custom Code action |

---

## Proposed Unified Structure

### Core Principle: **"When → If → Then" Model**

Every tag follows this mental model:
- **WHEN** (Triggers/Events) - What causes it to fire?
- **IF** (Conditions) - What must be true?
- **THEN** (Actions/Code) - What happens?

### Schema Enhancement

```typescript
// Enhanced Base Schema
export const BaseTagSchema = z.object({
  // Core Identity
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(), // REQUIRED for SEO
  
  // SEO Fields (NEW)
  seoTitle: z.string().optional(), // Custom SEO title (defaults to title)
  seoDescription: z.string().optional(), // Custom SEO description (defaults to description)
  keywords: z.array(z.string()).optional(), // SEO keywords
  searchTerms: z.array(z.string()).optional(), // Alternative search terms
  
  // Author & Verification
  author: z.union([z.string(), z.array(z.string())]),
  community_verified: z.boolean().default(false),
  
  // Platform & Type
  platform: z.enum(["GTM", "Adobe Launch", "Tealium", "GA4", "Meta", "Consent", "Server-Side", "Other"]),
  type: z.enum(["Tag", "Rule", "Snippet"]),
  
  // Use Case & Difficulty
  useCase: z.enum(["Ecommerce", "Consent", "UX", "Analytics", "Advertising", "Other"]),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  
  // Tags for categorization
  tags: z.array(z.string()), // REQUIRED for filtering and SEO
  
  // Vendor Information
  vendor: z.string().optional(),
  vendorIcon: z.string().optional(),
  
  // Content
  content: z.string(), // Code/HTML/Configuration
  
  // WHEN: Triggers/Events (Platform-specific)
  // IF: Conditions (Platform-specific)
  // THEN: Actions (Platform-specific)
  
  // Metadata
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  filePath: z.string().optional(),
});
```

### Platform-Specific Extensions

#### GTM Tag Schema
```typescript
export const GTMTagSchema = BaseTagSchema.extend({
  type: z.literal("Tag"),
  
  // THEN: What type of tag?
  tagType: z.string(), // "Custom HTML", "Google Analytics: GA4 Event", etc.
  
  // THEN: The code/content
  content: z.string(), // HTML, JavaScript, or configuration JSON
  
  // WHEN: Triggers
  triggers: z.array(GTMTriggerSchema).min(1),
  
  // IF: Trigger conditions (filters)
  // (handled within trigger.conditions)
  
  // IF NOT: Exceptions (prevent firing)
  exceptions: z.array(GTMExceptionSchema).optional(),
  
  // Priority
  executionOrder: z.number().optional(),
});
```

#### Adobe Launch Rule Schema
```typescript
export const AdobeLaunchRuleSchema = BaseTagSchema.extend({
  type: z.literal("Rule"),
  
  // WHEN: Events (OR logic - ANY can trigger)
  events: z.array(AdobeLaunchEventSchema).min(1),
  
  // IF: Conditions (AND logic - ALL must be true)
  conditions: z.array(AdobeLaunchConditionSchema).optional(),
  
  // THEN: Actions
  actions: z.array(AdobeLaunchActionSchema).optional(), // NEW
  
  // THEN: Custom Code (alternative to actions)
  content: z.string(), // Custom Code action content
  
  // Priority
  executionOrder: z.number().optional(),
});
```

### NEW: Adobe Launch Actions Schema
```typescript
export const AdobeLaunchActionSchema = z.object({
  name: z.string(), // e.g., "Send Beacon", "Set Variables"
  type: z.string(), // e.g., "Extension", "Custom Code"
  extension: z.string().optional(), // Extension name if type is "Extension"
  configuration: z.record(z.any()).optional(), // Extension configuration
  code: z.string().optional(), // Custom code if type is "Custom Code"
  description: z.string().optional(),
  order: z.number().optional(), // Action execution order
});
```

---

## SEO Strategy

### 1. Rich Metadata (Schema.org)

Add structured data to each tag page:

```typescript
// app/tags/[slug]/page.tsx - generateMetadata
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(slug);
  
  return {
    title: tag.seoTitle || `${tag.title} - ${tag.platform} Implementation | tracking.directory`,
    description: tag.seoDescription || tag.description || 
      `Learn how to implement ${tag.title} in ${tag.platform}. ${tag.description}`,
    keywords: [
      tag.title,
      tag.platform,
      ...(tag.tags || []),
      ...(tag.keywords || []),
      ...(tag.searchTerms || []),
      "tracking",
      "analytics",
      "tag manager",
    ].join(", "),
    openGraph: {
      title: tag.title,
      description: tag.description,
      type: "article",
      tags: tag.tags,
    },
    // Add JSON-LD structured data
    other: {
      "article:author": Array.isArray(tag.author) ? tag.author.join(", ") : tag.author,
      "article:published_time": tag.createdAt,
      "article:modified_time": tag.updatedAt,
    },
  };
}
```

### 2. JSON-LD Structured Data

Add to tag detail page:

```typescript
// components/tag-structured-data.tsx
export function TagStructuredData({ tag }: { tag: Tag }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tag.title,
    "description": tag.description,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Configure Trigger",
        "text": `Set up trigger: ${tag.triggers?.[0]?.name || "N/A"}`,
      },
      {
        "@type": "HowToStep",
        "name": "Add Code",
        "text": "Copy and paste the code into your tag manager",
      },
    ],
    "author": {
      "@type": "Person",
      "name": Array.isArray(tag.author) ? tag.author.join(", ") : tag.author,
    },
    "keywords": tag.tags?.join(", "),
    "datePublished": tag.createdAt,
    "dateModified": tag.updatedAt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### 3. SEO-Friendly URLs

Current: `/tags/facebook-pixel-pageview`
✅ Good: Descriptive, readable

Enhancement: Add canonical URLs and breadcrumbs

### 4. Content Optimization

**Title Format**: `[Action] [Platform] [Use Case]`
- ✅ "Facebook Pixel PageView - GTM Implementation"
- ✅ "GA4 Enhanced Ecommerce Tracking - Adobe Launch Rule"
- ❌ "Tag 1" (too generic)

**Description Format**: 
```
[What it does] for [platform]. [Key features]. [When to use it].
```

**Example**:
```
"Facebook Pixel PageView tracking tag for Google Tag Manager. 
Tracks page views and initializes the Facebook Pixel. 
Use this tag to track standard page views for Facebook advertising campaigns."
```

### 5. Search Terms & Keywords

Add fields for alternative search terms:

```typescript
{
  "title": "Facebook Pixel PageView",
  "keywords": ["facebook pixel", "meta pixel", "fb pixel", "pageview tracking"],
  "searchTerms": ["how to track pageviews facebook", "facebook pixel gtm setup", "meta pixel implementation"],
}
```

---

## Display Strategy: Making It Understandable

### Visual Hierarchy

```
┌─────────────────────────────────────────┐
│  [Platform Badge] [Type] [Difficulty]   │
│  Title                                    │
│  Description (SEO-optimized)              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  WHEN: This fires when...                │
│  ┌─────────────────────────────────────┐ │
│  │ Event/Trigger Name                   │ │
│  │ Type: Custom Event                   │ │
│  │ Event: "pageView"                    │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  IF: These conditions must be true...    │
│  ┌─────────────────────────────────────┐ │
│  │ Condition Name                      │ │
│  │ Code: window.location.pathname...   │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  THEN: This code executes...             │
│  ┌─────────────────────────────────────┐ │
│  │ [Code Block with syntax highlighting]│ │
│  │ [Copy Button]                        │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  IF NOT: These exceptions prevent...    │
│  ┌─────────────────────────────────────┐ │
│  │ Exception Name                       │ │
│  │ Condition: ...                       │ │
│  └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Enhanced BlueprintDisplay Component

```typescript
// components/blueprint-display.tsx - Enhanced version

export function BlueprintDisplay({ blueprint }: BlueprintDisplayProps) {
  return (
    <article className="space-y-6">
      {/* Header with SEO-optimized title */}
      <header>
        <h1 className="text-4xl font-semibold">{blueprint.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">
          {blueprint.description}
        </p>
        {/* Tags for filtering and SEO */}
        <div className="flex gap-2 mt-4">
          {blueprint.tags?.map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>

      {/* WHEN Section */}
      <section className="border-l-4 border-blue-500 pl-4">
        <h2 className="text-xl font-semibold mb-2">
          <span className="text-blue-500">WHEN:</span> This fires when...
        </h2>
        {/* Display triggers/events */}
      </section>

      {/* IF Section */}
      {conditions.length > 0 && (
        <section className="border-l-4 border-yellow-500 pl-4">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-yellow-500">IF:</span> These conditions must be true...
          </h2>
          {/* Display conditions */}
        </section>
      )}

      {/* THEN Section */}
      <section className="border-l-4 border-green-500 pl-4">
        <h2 className="text-xl font-semibold mb-2">
          <span className="text-green-500">THEN:</span> This code executes...
        </h2>
        {/* Display code */}
      </section>

      {/* IF NOT Section (Exceptions) */}
      {exceptions.length > 0 && (
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold mb-2">
            <span className="text-red-500">IF NOT:</span> These exceptions prevent firing...
          </h2>
          {/* Display exceptions */}
        </section>
      )}
    </article>
  );
}
```

---

## Implementation Plan

### Phase 1: Schema Enhancement (Day 1)
1. ✅ Add SEO fields to BaseTagSchema
2. ✅ Add `actions` array to AdobeLaunchRuleSchema
3. ✅ Make `description` and `tags` required
4. ✅ Add `keywords` and `searchTerms` fields

### Phase 2: Display Enhancement (Day 2)
1. ✅ Update `BlueprintDisplay` with "WHEN → IF → THEN" model
2. ✅ Add color-coded sections
3. ✅ Improve visual hierarchy
4. ✅ Add structured data component

### Phase 3: SEO Implementation (Day 3)
1. ✅ Enhance `generateMetadata` with SEO fields
2. ✅ Add JSON-LD structured data
3. ✅ Add canonical URLs
4. ✅ Add breadcrumbs

### Phase 4: Content Migration (Day 4-5)
1. ✅ Update existing tags with SEO fields
2. ✅ Add keywords and search terms
3. ✅ Improve descriptions
4. ✅ Test SEO with Google Search Console

---

## Example: Enhanced Tag Structure

### GTM Tag Example
```json
{
  "id": "facebook-pixel-pageview",
  "slug": "facebook-pixel-pageview",
  "title": "Facebook Pixel PageView",
  "seoTitle": "Facebook Pixel PageView - GTM Implementation Guide",
  "description": "Facebook Pixel PageView tracking tag for Google Tag Manager. Tracks page views and initializes the Facebook Pixel for advertising campaigns.",
  "seoDescription": "Learn how to implement Facebook Pixel PageView tracking in Google Tag Manager. Complete guide with code examples and trigger configuration.",
  "keywords": ["facebook pixel", "meta pixel", "fb pixel", "pageview tracking", "gtm"],
  "searchTerms": [
    "how to track pageviews facebook",
    "facebook pixel gtm setup",
    "meta pixel implementation guide",
    "fb pixel pageview tracking"
  ],
  "platform": "GTM",
  "type": "Tag",
  "tagType": "Custom HTML",
  "useCase": "Advertising",
  "difficulty": "Beginner",
  "tags": ["facebook", "pixel", "pageview", "gtm", "tracking", "advertising"],
  "content": "<!-- Facebook Pixel Code -->...",
  "triggers": [
    {
      "name": "All Pages",
      "type": "Page View",
      "description": "Fires on all page views",
      "conditions": [
        {
          "variable": "Page URL",
          "operator": "does not contain",
          "value": "/admin",
          "description": "Exclude admin pages"
        }
      ]
    }
  ],
  "exceptions": [
    {
      "name": "Don't fire on homepage",
      "condition": "window.dataLayer.pageType === 'homepage'",
      "description": "Prevents firing on homepage"
    }
  ]
}
```

### Adobe Launch Rule Example
```json
{
  "id": "cookiebot-consent-manager",
  "slug": "cookiebot-consent-manager",
  "title": "Cookiebot Consent Manager Integration",
  "seoTitle": "Cookiebot Consent Manager - Adobe Launch Integration",
  "description": "Integrate Cookiebot consent manager with GA4 and Meta Pixel. Updates consent preferences when user changes their cookie preferences.",
  "seoDescription": "Complete guide to integrating Cookiebot consent manager with Adobe Launch. Includes GA4 and Meta Pixel consent updates.",
  "keywords": ["cookiebot", "consent", "gdpr", "adobe launch", "privacy"],
  "searchTerms": [
    "cookiebot adobe launch",
    "consent management adobe",
    "gdpr consent adobe launch",
    "cookiebot integration guide"
  ],
  "platform": "Adobe Launch",
  "type": "Rule",
  "useCase": "Consent",
  "difficulty": "Intermediate",
  "tags": ["consent", "cookiebot", "ga4", "meta", "adobe-launch", "privacy"],
  "events": [
    {
      "name": "Consent Update",
      "type": "Custom Event",
      "eventName": "CookiebotConsentUpdate",
      "description": "Fires when user updates consent preferences"
    }
  ],
  "conditions": [
    {
      "name": "When user grants consent",
      "type": "Custom Code",
      "condition": "Cookiebot.consent.statistics === true",
      "description": "Only execute if user has granted statistics consent"
    }
  ],
  "actions": [
    {
      "name": "Update GA4 Consent",
      "type": "Custom Code",
      "code": "gtag('consent', 'update', { 'analytics_storage': 'granted' });",
      "order": 1
    },
    {
      "name": "Update Meta Pixel Consent",
      "type": "Custom Code",
      "code": "fbq('consent', 'grant');",
      "order": 2
    }
  ],
  "content": "// Alternative: single custom code block\nfunction onCookiebotConsentUpdate() { ... }"
}
```

---

## Key Takeaways

1. **Unified Mental Model**: "WHEN → IF → THEN" works for both platforms
2. **SEO-First**: Rich metadata, structured data, keyword optimization
3. **Visual Clarity**: Color-coded sections, clear hierarchy
4. **Flexibility**: Platform-specific fields, but unified base structure
5. **Discoverability**: Keywords, search terms, and optimized descriptions

---

## Next Steps

1. **Review this design** - Does it address your concerns?
2. **Implement schema changes** - Add SEO fields and actions
3. **Update display component** - "WHEN → IF → THEN" model
4. **Enhance existing tags** - Add SEO metadata
5. **Test SEO** - Google Search Console setup

Want to discuss any specific part in more detail?

