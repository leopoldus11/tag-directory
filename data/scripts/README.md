# Contributing Scripts to tag.directory

Scripts are reusable code snippets that can be implemented as Custom Code in Recipes (GTM tags, Adobe Launch rules, etc.).

## Script Format

Scripts can be added in two formats:

### Option A: JSON Format (`.json`)

```json
{
  "id": "unique-script-id",
  "name": "Script Name",
  "platform": "GA4",
  "codeSnippet": "// Your reusable code here\ngtag('event', 'custom_event', {\n  custom_parameter: 'value'\n});",
  "author": "Your Name",
  "difficulty": "Beginner",
  "description": "A brief description of what this script does",
  "tags": ["analytics", "tracking"],
  "vendor": "Google",
  "vendorIcon": "google"
}
```

### Option B: MDC Format (`.mdc`)

```markdown
---
id: unique-script-id
name: Script Name
platform: GA4
author: Your Name
difficulty: Beginner
description: A brief description
tags: ["analytics", "tracking"]
vendor: Google
vendorIcon: google
---
// Your reusable code here
gtag('event', 'custom_event', {
  custom_parameter: 'value'
});
```

## Required Fields

- **id** (string): Unique identifier (lowercase, hyphens, no spaces)
- **name** (string): Display name
- **platform** (string): One of: `GA4`, `Meta`, `Consent`, `Server-Side`, `GTM`, `Adobe Launch`, `Other`
- **codeSnippet** (string): The reusable code
- **author** (string): Your name or GitHub username
- **difficulty** (string): One of: `Beginner`, `Intermediate`, `Advanced`

## Optional Fields

- **description** (string): Brief description
- **tags** (array): Relevant tags
- **vendor** (string): Vendor name
- **vendorIcon** (string): Icon identifier
- **usedInRecipes** (array): IDs of recipes that use this script
- **createdAt** (string): ISO date string
- **updatedAt** (string): ISO date string

## Best Practices

1. **Reusability**: Scripts should be reusable across multiple recipes
2. **Parameters**: Document any parameters or configuration needed
3. **Examples**: Include usage examples in description
4. **Testing**: Test scripts before submitting

## Submission

Follow the [Contributing Guide](../../CONTRIBUTING.md) for PR submission process.

