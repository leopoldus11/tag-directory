# Contributing Recipes to tag.directory

Thank you for considering contributing to tag.directory! This guide will help you add new recipes to the library.

## How to Contribute

### 1. Fork the Repository

First, fork the [tag.directory repository](https://github.com/your-org/tag-directory) on GitHub.

### 2. Add Your Recipe

Recipes can be added in two formats:

#### Option A: JSON Format (`.json`)

Create a new file in the `/data/recipes` directory with a descriptive filename (e.g., `ga4-enhanced-ecommerce.json`).

```json
{
  "id": "unique-recipe-id",
  "name": "Recipe Name",
  "platform": "GA4",
  "trigger": "Page Load",
  "condition": "All pages",
  "codeSnippet": "gtag('event', 'purchase', {\n  transaction_id: 'T12345',\n  value: 25.42,\n  currency: 'USD'\n});",
  "author": "Your Name",
  "difficulty": "Beginner",
  "description": "A brief description of what this recipe does",
  "tags": ["analytics", "ecommerce", "tracking"],
  "vendor": "Google",
  "vendorIcon": "google"
}
```

#### Option B: MDC Format (`.mdc`)

Create a new file with a `.mdc` extension. This format uses frontmatter for metadata and the code snippet in the body.

```markdown
---
id: unique-recipe-id
name: Recipe Name
platform: Meta
trigger: Page View
condition: All pages
author: Your Name
difficulty: Intermediate
description: A brief description
tags: ["facebook", "pixel"]
vendor: Meta
vendorIcon: meta
---
fbq('track', 'Purchase', {
  value: 25.42,
  currency: 'USD'
});
```

### 3. Recipe Schema

All recipes must include the following required fields:

- **id** (string): A unique identifier (lowercase, hyphens, no spaces)
- **name** (string): Display name of the recipe
- **platform** (string): One of: `GA4`, `Meta`, `Consent`, `Server-Side`, `GTM`, `Adobe Launch`, `Other`
- **trigger** (string): When the script should run (e.g., "Page Load", "Click", "Form Submit")
- **codeSnippet** (string): The actual code/script to execute
- **author** (string): Your name or GitHub username
- **difficulty** (string): One of: `Beginner`, `Intermediate`, `Advanced`

Optional fields:

- **condition** (string): Conditions under which the script runs
- **description** (string): A brief description of the recipe
- **tags** (array of strings): Relevant tags for categorization
- **vendor** (string): The vendor name (e.g., "Google", "Meta")
- **vendorIcon** (string): Icon identifier or emoji
- **createdAt** (string): ISO date string
- **updatedAt** (string): ISO date string

### 4. Submit a Pull Request

1. Commit your changes with a clear message:
   ```bash
   git add data/recipes/your-recipe.json
   git commit -m "Add recipe: [Recipe Name]"
   ```

2. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```

3. Open a Pull Request on GitHub with:
   - A clear title describing the recipe
   - A description of what the recipe does
   - Any relevant context or use cases

### 5. Review Process

- All PRs will be reviewed for:
  - Code quality and correctness
  - Proper formatting
  - Completeness of required fields
  - Uniqueness (no duplicate recipes)

## Best Practices

1. **Naming**: Use descriptive, lowercase filenames with hyphens (e.g., `ga4-enhanced-ecommerce.json`)
2. **IDs**: Make recipe IDs unique and descriptive
3. **Code Quality**: Ensure code snippets are production-ready and well-commented
4. **Documentation**: Provide clear descriptions and use cases
5. **Testing**: Test your recipes before submitting

## Questions?

If you have questions or need help, please:
- Open an issue on GitHub
- Check existing recipes for examples
- Review the [main README](../README.md) for project guidelines

Thank you for contributing to tag.directory! 🎉

