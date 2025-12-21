# Contributing Standards to tag.directory

Standards are community-driven best practices for tracking implementations. They help establish industry standards and ensure consistent tracking across projects.

## Standard Format

Standards can be added in JSON or MDC format:

### JSON Format (`.json`)

```json
{
  "id": "unique-standard-id",
  "title": "Standard Title",
  "description": "Description of the standard",
  "platforms": ["GA4", "GTM"],
  "level": "Beginner",
  "author": "Your Name",
  "content": "Detailed explanation of the standard...",
  "examples": ["example-recipe-id-1", "example-recipe-id-2"],
  "tags": ["ecommerce", "tracking"],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### MDC Format (`.mdc`)

```markdown
---
id: unique-standard-id
title: Standard Title
platforms: GA4, GTM
level: Beginner
author: Your Name
tags: ["ecommerce", "tracking"]
examples: ["example-recipe-id-1"]
---
Detailed explanation of the standard and best practices...
```

## Required Fields

- **id** (string): Unique identifier
- **title** (string): Standard title
- **description** (string): Brief description
- **platforms** (array): List of applicable platforms
- **level** (string): `Beginner`, `Intermediate`, or `Advanced`
- **author** (string): Your name or GitHub username
- **content** (string): Detailed explanation (or body in MDC)

## Optional Fields

- **examples** (array): Recipe/script IDs that demonstrate this standard
- **tags** (array): Relevant tags
- **createdAt** (string): ISO date string
- **updatedAt** (string): ISO date string

## Best Practices

1. **Based on Experience**: Standards should be based on real-world experience
2. **Well-Documented**: Include detailed explanations and rationale
3. **Examples**: Link to recipes/scripts that demonstrate the standard
4. **Community Consensus**: Standards should reflect community consensus

## Submission

Follow the [Contributing Guide](../../CONTRIBUTING.md) for PR submission process.

