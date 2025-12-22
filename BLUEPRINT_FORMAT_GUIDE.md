# Blueprint Format Guide for Contributors

## Overview

Blueprints use a **unified JSON schema** that adapts to different platforms (GTM, Adobe Launch, Tealium, etc.). The display automatically adjusts to show information in the order that matches each platform's native interface.

## Platform-Specific Display Order

### Google Tag Manager (GTM)
**Display Order:**
1. Tag Type (e.g., "Custom HTML", "Google Analytics: GA4 Event")
2. Code
3. Firing Triggers
4. Exceptions (conditions that prevent firing)

### Adobe Launch / Tealium
**Display Order:**
1. Triggers
2. Conditions
3. Code

### GA4 / Meta / Other
**Display Order:**
1. Code
2. Triggers
3. Conditions

## JSON Schema Structure

### Required Fields

```json
{
  "id": "unique-blueprint-id",
  "slug": "unique-blueprint-id",
  "title": "Blueprint Title",
  "author": "your-github-username",
  "platform": "GTM" | "Adobe Launch" | "Tealium" | "GA4" | "Meta" | "Consent" | "Server-Side" | "Other",
  "type": "Tag" | "Rule" | "Snippet",
  "content": "Your code here (JavaScript, HTML, etc.)",
  "community_verified": false
}
```

### Optional Fields

```json
{
  "description": "Brief description of what this blueprint does",
  "difficulty": "Beginner" | "Intermediate" | "Advanced",
  "tags": ["tag1", "tag2", "tag3"],
  "vendor": "Vendor name (e.g., 'Google', 'Meta')",
  "vendorIcon": "📊",
  "useCase": "Ecommerce" | "Consent" | "UX" | "Analytics" | "Advertising" | "Other",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Platform-Specific Fields

#### For GTM Tags

```json
{
  "tagType": "Custom HTML" | "Google Analytics: GA4 Event" | "Universal Analytics" | etc.,
  "triggers": [
    {
      "name": "All Pages",
      "type": "Page View",
      "description": "Fires on all page views"
    }
  ],
  "exceptions": [
    {
      "name": "Don't fire on homepage",
      "condition": "window.dataLayer.pageType === 'homepage'",
      "description": "Prevents firing on homepage"
    }
  ],
  "executionOrder": 1
}
```

#### For Adobe Launch / Tealium Rules

```json
{
  "triggers": [
    {
      "name": "Consent Update",
      "type": "Custom Event",
      "event": "CookiebotConsentUpdate",
      "description": "Fires when user updates consent"
    }
  ],
  "conditions": [
    {
      "name": "When user grants consent",
      "condition": "Cookiebot.consent.statistics === true",
      "description": "Only execute if statistics consent is granted"
    }
  ],
  "executionOrder": 1
}
```

#### For All Platforms

```json
{
  "filePath": "src/content/blueprints/your-blueprint.json"
}
```

**Note:** `filePath` is automatically set when loading, but you can specify it explicitly.

## Complete Examples

### Example 1: GTM Custom HTML Tag

```json
{
  "id": "facebook-pixel-pageview",
  "slug": "facebook-pixel-pageview",
  "title": "Facebook Pixel PageView",
  "author": "leopoldus11",
  "platform": "GTM",
  "type": "Tag",
  "tagType": "Custom HTML",
  "content": "<!-- Facebook Pixel Code -->\n<script>\nfbq('init', '{{Pixel ID}}');\nfbq('track', 'PageView');\n</script>",
  "community_verified": false,
  "description": "Facebook Pixel PageView tracking tag",
  "difficulty": "Beginner",
  "tags": ["facebook", "pixel", "gtm"],
  "triggers": [
    {
      "name": "All Pages",
      "type": "Page View",
      "description": "Fires on all page views"
    }
  ],
  "exceptions": [
    {
      "name": "Don't fire on homepage",
      "condition": "window.dataLayer.pageType === 'homepage'"
    }
  ],
  "executionOrder": 1,
  "useCase": "Advertising",
  "vendor": "Meta",
  "vendorIcon": "📘"
}
```

### Example 2: Adobe Launch Rule

```json
{
  "id": "cookiebot-consent-manager",
  "slug": "cookiebot-consent-manager",
  "title": "Cookiebot Consent Manager Integration",
  "author": "leopoldus11",
  "platform": "Adobe Launch",
  "type": "Rule",
  "content": "function onCookiebotConsentUpdate() {\n  const consent = Cookiebot.consent;\n  if (consent.statistics) {\n    gtag('consent', 'update', {\n      'analytics_storage': 'granted'\n    });\n  }\n}\nCookiebot.onConsentReady = onCookiebotConsentUpdate;",
  "community_verified": false,
  "description": "Integrate Cookiebot consent manager with GA4",
  "difficulty": "Intermediate",
  "tags": ["consent", "cookiebot", "ga4"],
  "triggers": [
    {
      "name": "Consent Update",
      "type": "Custom Event",
      "event": "CookiebotConsentUpdate"
    }
  ],
  "conditions": [
    {
      "name": "When user updates consent",
      "condition": "Cookiebot.consent.statistics === true"
    }
  ],
  "executionOrder": 1,
  "useCase": "Consent"
}
```

## Legacy Format Support

For backward compatibility, the system still supports:

```json
{
  "trigger": "Page View",  // Single trigger as string
  "condition": "URL contains /checkout/"  // Single condition as string
}
```

These are automatically converted to the new array format for display.

## Field Descriptions

### `triggers` (Array)
- **For GTM:** When the tag should fire
- **For Adobe Launch/Tealium:** When the rule should execute
- Each trigger has:
  - `name`: Human-readable name
  - `type`: Type of trigger (e.g., "Page View", "Custom Event")
  - `event`: Event name (for custom events)
  - `description`: Optional description

### `conditions` (Array)
- **For Adobe Launch/Tealium:** Conditions that must be met
- Each condition has:
  - `name`: Optional name
  - `condition`: The actual condition logic (JavaScript expression)
  - `description`: Optional description

### `exceptions` (Array, GTM only)
- Conditions that **prevent** the tag from firing
- Same structure as `conditions`
- Displayed with warning styling

### `executionOrder` (Number)
- When multiple rules/tags use the same trigger
- Lower numbers execute first
- Useful for dependency management

### `tagType` (String, GTM only)
- The type of GTM tag
- Examples: "Custom HTML", "Google Analytics: GA4 Event", "Universal Analytics"

## GitHub Link

The system automatically generates a GitHub link to the source file. The link appears as a "View Source" button on the blueprint detail page.

If you want to specify a custom path, use the `filePath` field:
```json
{
  "filePath": "src/content/blueprints/my-blueprint.json"
}
```

## Best Practices

1. **Use arrays for triggers/conditions** (not legacy string format)
2. **Be descriptive** in names and descriptions
3. **Include executionOrder** if multiple rules share triggers
4. **Use proper tagType** for GTM tags
5. **Add exceptions** for GTM when you need to prevent firing
6. **Test your JSON** before submitting (use `npm run validate:blueprints`)

## Validation

Before submitting, validate your blueprint:

```bash
npm run validate:blueprints
```

This checks:
- ✅ Required fields present
- ✅ Valid platform and type values
- ✅ Proper JSON structure
- ✅ No duplicate IDs

---

**Questions?** See [CONTRIBUTING.md](./CONTRIBUTING.md) or open a GitHub Discussion!

