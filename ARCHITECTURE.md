# Architecture: GitHub-Based Content Management

## Overview

tag.directory uses a **GitHub-first architecture** where all content (recipes, scripts, standards) is stored directly in the repository and managed through Pull Requests (PRs). This enables:

- ✅ **Community-driven contributions** via PRs
- ✅ **Automatic validation** via GitHub Actions
- ✅ **Version control** for all content
- ✅ **Transparent review process**
- ✅ **Automatic deployments** via Vercel

## Content Storage

All content is stored in the repository under `/data`:

```
data/
├── recipes/          # GTM tags, Adobe Launch rules
│   ├── *.json       # JSON format
│   └── *.mdc        # Markdown with frontmatter
├── scripts/         # Reusable code snippets
│   ├── *.json
│   └── *.mdc
└── standards/       # Best practices
    ├── *.json
    └── *.mdc
```

## Workflow

### 1. Community Contribution

```
Developer → Fork Repo → Add Content → Validate → PR → Review → Merge → Deploy
```

**Step-by-step:**
1. **Fork** the repository on GitHub
2. **Clone** and create a branch
3. **Add** recipe/script/standard file
4. **Validate** locally: `npm run validate:all`
5. **Commit** and push to fork
6. **Open PR** on GitHub
7. **Community reviews** and discusses
8. **Maintainer merges** approved PRs
9. **Vercel auto-deploys** on merge

### 2. Automatic Validation

GitHub Actions automatically validates all PRs:

**`.github/workflows/validate-pr.yml`**
- Runs on PRs that modify `/data/` files
- Validates schema compliance
- Checks for duplicate IDs
- Ensures required fields
- Comments on PR if validation fails

**Validation Scripts:**
- `scripts/validate-recipes.ts` - Recipe schema validation
- `scripts/validate-scripts.ts` - Script schema validation
- `scripts/check-duplicates.ts` - Duplicate ID detection

### 3. Build & Deployment

**Vercel Integration:**
- Automatically builds on every push to `main`
- Reads content from `/data` directories
- Generates static pages
- Deploys instantly

**Build Process:**
1. Vercel clones repository
2. Runs `npm install`
3. Runs `npm run build`
4. Next.js reads files from `/data/`
5. Generates static pages
6. Deploys to CDN

## Data Loading

### Server-Side (Build Time)

```typescript
// lib/recipes.ts
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "recipes");

export function getAllRecipesMetadata(): RecipeMetadata[] {
  const files = fs.readdirSync(DATA_DIR);
  // Read and parse files...
}
```

**Benefits:**
- ✅ Fast - content loaded at build time
- ✅ Static - no runtime database needed
- ✅ Simple - just file system reads
- ✅ Version controlled - all content in Git

### Client-Side (Runtime)

For dynamic features (search, filtering):
- Content is pre-loaded at build time
- Passed as props to client components
- Filtered/searched client-side

## Review Process

### Community-Driven Decisions

1. **PR Template** - Standardizes submissions
2. **GitHub Discussions** - For proposals and questions
3. **Issue Templates** - For new recipe proposals
4. **Reactions** - Community voting (👍 on PRs)
5. **Comments** - Discussion and feedback

### Review Criteria

PRs are evaluated on:
- ✅ Code quality and correctness
- ✅ Completeness (all required fields)
- ✅ Uniqueness (no duplicates)
- ✅ Usefulness (solves real problems)
- ✅ Documentation (clear descriptions)

### Approval Process

- **Community members** review and comment
- **Maintainers** make final merge decisions
- **Automated checks** must pass
- **Discussion** happens in PR comments

## File Formats

### JSON Format

```json
{
  "id": "unique-id",
  "name": "Recipe Name",
  "platform": "GA4",
  "codeSnippet": "...",
  "author": "username"
}
```

**Pros:**
- Easy to parse
- Type-safe with TypeScript
- Good for structured data

### MDC Format (Markdown + Frontmatter)

```markdown
---
id: unique-id
name: Recipe Name
platform: GA4
---
// Code snippet here
gtag('event', 'purchase');
```

**Pros:**
- Better for code snippets
- Easier to read/edit
- Supports markdown in descriptions

## Future Enhancements

### Potential Additions

1. **GitHub Discussions** - For community Q&A
2. **Voting System** - Upvote/downvote recipes
3. **Comments** - Discussion on individual recipes
4. **Analytics** - Track popular recipes
5. **Search API** - Programmatic access
6. **Webhooks** - Notify on new recipes

### Database Migration (Optional)

If needed in the future:
- Keep GitHub as source of truth
- Sync to database for advanced features
- Use GitHub webhooks to trigger syncs

## Benefits of This Architecture

1. **Transparency** - All content visible in GitHub
2. **Version Control** - Full history of changes
3. **Community Ownership** - Anyone can contribute
4. **No Infrastructure** - No database to maintain
5. **Fast Deploys** - Static generation is instant
6. **Free Hosting** - Vercel free tier sufficient
7. **Scalable** - Handles 1000s of recipes easily

## Maintenance

### Regular Tasks

- Review and merge PRs
- Update documentation
- Maintain validation scripts
- Monitor GitHub Actions
- Engage with community

### Automation

- ✅ PR validation (GitHub Actions)
- ✅ Auto-deployment (Vercel)
- ✅ Schema validation (TypeScript)
- 🔄 Future: Auto-formatting, auto-tagging

---

This architecture ensures tag.directory remains **open, transparent, and community-driven** while being **simple to maintain and scale**.

