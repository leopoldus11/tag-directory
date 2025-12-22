# Blueprint Display Design - Platform-Aware System

## Design Philosophy

**Unified Schema, Platform-Specific Display**

- All blueprints use the same JSON schema (flexible, extensible)
- Display adapts to platform conventions
- Visual hierarchy matches each platform's native UI

## Platform Visual Hierarchies

### Adobe Launch / Tealium
```
1. Trigger(s) → When does this run?
2. Condition(s) → Under what conditions?
3. Code → What executes?
```

### Google Tag Manager
```
1. Tag Type → What kind of tag?
2. Code → The actual code/HTML
3. Trigger → When does it fire?
4. Exceptions → When should it NOT fire?
```

### GA4 / Meta (Direct Implementation)
```
1. Code → The tracking code
2. Trigger → When to execute
3. Conditions → Optional conditions
```

## Enhanced Schema Structure

### Core Fields (All Platforms)
- `id`, `slug`, `title`, `author`, `platform`, `type`
- `content` (code)
- `description`, `difficulty`, `tags`

### Platform-Specific Fields

**For Adobe Launch / Tealium:**
- `triggers`: Array of trigger objects
- `conditions`: Array of condition objects
- `executionOrder`: Number (when multiple rules use same trigger)

**For GTM:**
- `tagType`: String (e.g., "Custom HTML", "Google Analytics: GA4 Event")
- `triggers`: Array of trigger objects
- `exceptions`: Array of exception objects (conditions that prevent firing)
- `executionOrder`: Number

**For All Platforms:**
- `filePath`: String (path to source file for GitHub link)
- `additionalConfig`: Object (platform-specific settings)

## JSON Structure Examples

### Adobe Launch Rule Example
```json
{
  "id": "cookiebot-consent-manager",
  "slug": "cookiebot-consent-manager",
  "title": "Cookiebot Consent Manager Integration",
  "author": "leopoldus11",
  "platform": "Adobe Launch",
  "type": "Rule",
  "content": "function onCookiebotConsentUpdate() {\n  const consent = Cookiebot.consent;\n  if (consent.statistics) {\n    gtag('consent', 'update', {\n      'analytics_storage': 'granted'\n    });\n  }\n  if (consent.marketing) {\n    fbq('consent', 'grant');\n  }\n}\nCookiebot.onConsentReady = onCookiebotConsentUpdate;",
  "triggers": [
    {
      "name": "Consent Update",
      "type": "Custom Event",
      "event": "CookiebotConsentUpdate"
    }
  ],
  "conditions": [
    {
      "name": "When user updates consent preferences",
      "logic": "AND",
      "rules": [
        {
          "condition": "Cookiebot.consent.statistics === true OR Cookiebot.consent.marketing === true"
        }
      ]
    }
  ],
  "executionOrder": 1,
  "filePath": "src/content/blueprints/cookiebot-consent-manager.json"
}
```

### GTM Tag Example
```json
{
  "id": "facebook-pixel-pageview",
  "slug": "facebook-pixel-pageview",
  "title": "Facebook Pixel PageView",
  "author": "leopoldus11",
  "platform": "GTM",
  "type": "Tag",
  "tagType": "Custom HTML",
  "content": "<!-- Facebook Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s)\n{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', '2441510862742589');\nfbq('track', 'PageView');\n</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\"\nsrc=\"https://www.facebook.com/tr?id=2441510862742589&ev=PageView&noscript=1\"\n/></noscript>\n<!-- End Facebook Pixel Code -->",
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
  "filePath": "src/content/blueprints/facebook-pixel-pageview.json"
}
```

## Display Component Design

### Platform-Aware Blueprint Display

The component will:
1. Detect platform from blueprint
2. Render sections in platform-appropriate order
3. Show platform-specific fields
4. Include GitHub link to source file

### Visual Sections

**Header:**
- Title, badges (platform, type, difficulty)
- Description
- GitHub link button

**Configuration (Platform-Specific Order):**

**Adobe Launch:**
1. Triggers section
2. Conditions section
3. Code section

**GTM:**
1. Tag Type section
2. Code section
3. Triggers section
4. Exceptions section

**Code Section:**
- Syntax highlighted code
- Copy button
- Language detection

**Metadata:**
- Author, date, tags
- Execution order (if applicable)
- Community verified badge

## Implementation Plan

1. ✅ Enhance Zod schema with new fields
2. ✅ Create platform-aware display component
3. ✅ Update blueprint detail page
4. ✅ Add GitHub link functionality
5. ✅ Update contribution form
6. ✅ Create example blueprints

