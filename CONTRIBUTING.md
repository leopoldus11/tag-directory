# Contributing to tracking.directory

Thank you for your interest in contributing to tracking.directory! This document outlines the process for contributing blueprints, scripts, and standards to the open-source library.

## Architecture Overview

tag.directory is a **GitHub-based open-source library**. All content (blueprints, scripts, standards) is stored in the repository and managed through Pull Requests (PRs).

### Content Storage

- **Blueprints**: `/src/content/blueprints/*.json` or `*.mdc` (new format)
- **Scripts**: `/data/scripts/*.json` or `*.mdc`
- **Standards**: `/data/standards/*.json` or `*.mdc`

### Workflow

1. **Fork** the repository
2. **Create** your blueprint/script/standard file
3. **Submit** a Pull Request
4. **Community Review** - PRs are reviewed by the community
5. **Merge** - Approved PRs are merged and automatically deployed

## How to Contribute

### Step 1: Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/leopoldus11/tag-directory.git
cd tag-directory
npm install
```

### Step 2: Create Your Content

Choose the appropriate directory:
- **Blueprints**: `/src/content/blueprints/` (preferred)
- **Scripts**: `/data/scripts/`
- **Standards**: `/data/standards/`

### Step 3: Blueprint Schema

All blueprints must follow the Zod schema defined in `lib/schemas/blueprint.ts`:

**Required Fields:**
- `id`: Unique identifier (lowercase, hyphens, no spaces)
- `slug`: URL-friendly identifier (usually same as id)
- `title`: Display name
- `author`: Your GitHub username
- `platform`: One of: GTM, Adobe Launch, Tealium, GA4, Meta, Consent, Server-Side, Other
- `type`: "Tag", "Rule", or "Snippet"
- `content`: Code snippet (Markdown or JavaScript)
- `community_verified`: boolean (default: false)

**Optional Fields:**
- `description`: Brief description
- `difficulty`: Beginner, Intermediate, Advanced
- `tags`: Array of strings
- `trigger`: When the script runs
- `condition`: Conditions for execution
- `vendor`: Vendor name
- `vendorIcon`: Icon identifier
- `useCase`: Ecommerce, Consent, UX, Analytics, Other

### Step 4: File Format

#### Option A: JSON Format

Create a file: `src/content/blueprints/your-blueprint-id.json`

```json
{
  "id": "ga4-enhanced-ecommerce",
  "slug": "ga4-enhanced-ecommerce",
  "title": "GA4 Enhanced Ecommerce Tracking",
  "author": "your-github-username",
  "platform": "GA4",
  "type": "Tag",
  "content": "gtag('event', 'purchase', {\n  transaction_id: 'T12345',\n  value: 25.42,\n  currency: 'USD'\n});",
  "community_verified": false,
  "description": "Enhanced ecommerce tracking for GA4",
  "difficulty": "Intermediate",
  "tags": ["ecommerce", "ga4", "tracking"]
}
```

#### Option B: MDC Format

Create a file: `src/content/blueprints/your-blueprint-id.mdc`

```markdown
---
id: ga4-enhanced-ecommerce
slug: ga4-enhanced-ecommerce
title: GA4 Enhanced Ecommerce Tracking
author: your-github-username
platform: GA4
type: Tag
description: Enhanced ecommerce tracking for GA4
difficulty: Intermediate
tags: ["ecommerce", "ga4", "tracking"]
---
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 25.42,
  currency: 'USD'
});
```

### Step 5: Validate Locally

Before submitting, validate your content:

```bash
# Validate all content
npm run validate:all

# Or validate individually
npm run validate:recipes
npm run validate:scripts
npm run check:duplicates
```

### Step 6: Submit a Pull Request

1. **Create a branch:**
   ```bash
   git checkout -b add-blueprint-name
   ```

2. **Add your file:**
   ```bash
   git add src/content/blueprints/your-blueprint.json
   git commit -m "Add blueprint: [Blueprint Name]"
   ```

3. **Push to your fork:**
   ```bash
   git push origin add-blueprint-name
   ```

4. **Open a PR on GitHub:**
   - Use the PR template
   - Describe what your blueprint does
   - Link any related issues
   - Ensure all validation checks pass

## Contribution Methods

### Method 1: Fork & PR (Recommended)

1. Fork the repository
2. Create your blueprint file
3. Submit a Pull Request
4. Community reviews and merges

### Method 2: GitHub Issue (For Beginners)

1. Go to `/contribute` page
2. Fill out the form
3. Generate JSON
4. Create a GitHub issue with the JSON
5. Maintainers will create the PR for you

## Community Review Process

### PR Validation

All PRs are automatically validated by GitHub Actions:
- ✅ Schema validation (Zod)
- ✅ Required fields check
- ✅ Duplicate ID detection
- ✅ Format validation

### Review Criteria

PRs are reviewed by the community based on:

1. **Code Quality**: Production-ready, well-commented code
2. **Completeness**: All required fields present
3. **Uniqueness**: No duplicate content
4. **Usefulness**: Solves a real tracking problem
5. **Documentation**: Clear description and use cases

### Approval Process

- **Community members** can review and comment
- **Maintainers** make final merge decisions
- **Discussion** happens in PR comments
- **Voting** can be done via reactions (👍) on PRs

## Content Guidelines

### Blueprints

**Best Practices:**
- Test in production before submitting
- Include clear descriptions
- Add relevant tags
- Follow existing naming conventions
- Use descriptive IDs (e.g., `ga4-enhanced-ecommerce` not `recipe1`)

### Scripts

**Best Practices:**
- Make scripts reusable
- Document parameters
- Include examples

### Standards

**Best Practices:**
- Based on real-world experience
- Well-documented
- Include examples

## Getting Help

- **Questions?** Open a [GitHub Discussion](https://github.com/leopoldus11/tag-directory/discussions)
- **Found a bug?** Open an [Issue](https://github.com/leopoldus11/tag-directory/issues)
- **Want to discuss?** Use GitHub Discussions

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. See [CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping build tracking.directory! 🎉
