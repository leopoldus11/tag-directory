# Core Architecture: Contribution & Routing Engine

## Overview

tag.directory uses a **Git-powered, file-based content system** with a sophisticated contribution workflow designed for community-driven open-source collaboration.

## 1. Core Architecture: Git-Powered Content

### File Structure

```
src/content/blueprints/     # New blueprint files (JSON or MDC)
data/recipes/               # Legacy recipes (migrated automatically)
data/scripts/               # Scripts
data/standards/             # Standards
data/authors/               # Author profiles (authors.json)
```

### Zod Schema: Tracking Blueprint

**Location:** `lib/schemas/blueprint.ts`

```typescript
TrackingBlueprint {
  id: string                    // Unique identifier
  slug: string                  // URL-friendly identifier
  title: string                 // Display name
  author: string                // GitHub username
  platform: Platform            // GTM, Adobe Launch, Tealium, etc.
  type: "Tag" | "Rule" | "Snippet"
  content: string               // Markdown/Code
  community_verified: boolean   // Community approval status
  // ... optional fields
}
```

### Dynamic Routing

- **Route:** `/blueprints/[slug]`
- **File:** `app/blueprints/[slug]/page.tsx`
- **Features:**
  - SEO-optimized with dynamic metadata
  - Code highlighting with Shiki
  - Author linking to member profiles
  - Community verification badge

## 2. Contribution Workflow

### `/contribute` Page

**Two Contribution Paths:**

#### Path A: The Pro (Fork & PR)
- Direct link to GitHub repository
- Instructions for experienced contributors
- Fork → Create file → PR workflow

#### Path B: The Form (Generate JSON)
- User-friendly form interface
- Validates input with Zod schema
- Generates pre-formatted JSON
- User copies JSON and pastes into GitHub issue
- No database required - pure client-side

**Form Features:**
- All required fields validated
- Platform and Type dropdowns
- Code snippet textarea
- Optional fields (description, difficulty, trigger, condition)
- One-click copy to clipboard

## 3. Enhanced UI/UX

### Sidebar Navigation

**Grouped Filters:**
- **Platform:** GTM, Adobe Launch, Tealium, GA4, Meta, Consent, Server-Side, Other
- **Use Case:** Ecommerce, Consent, UX, Analytics, Other
- Collapsible sections with chevron icons
- Active state highlighting

### Member Profiles

**Component:** `components/member-profile.tsx`
- Reads from `data/authors/authors.json`
- Compact and full view modes
- Links to GitHub profiles
- Contribution count display
- Monospace font for usernames

**Authors JSON Structure:**
```json
{
  "username": "MaydayV",
  "name": "Mayday V",
  "avatar": "MV",
  "bio": "Senior Digital Analytics Engineer",
  "contributions": 0,
  "github": "https://github.com/MaydayV"
}
```

### Code Highlighting

**Component:** `components/code-block.tsx`
- Uses **Shiki** for syntax highlighting
- GitHub Dark theme
- Client-side rendering (avoids SSR issues)
- Copy button on hover
- Fallback to plain code if highlighting fails

## 4. Technical Stack

### Core Technologies
- **Next.js 15** (App Router)
- **TypeScript** (Full type safety)
- **Zod** (Runtime validation)
- **Tailwind CSS** (Styling)
- **shadcn/ui** (UI components)
- **Lucide Icons** (Icons)
- **Shiki** (Code highlighting)

### SEO Optimization

All routes include dynamic metadata:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${blueprint.title} | tag.directory`,
    description: blueprint.description,
    openGraph: { ... }
  };
}
```

**Routes with SEO:**
- `/` - Home page
- `/blueprints` - Blueprints listing
- `/blueprints/[slug]` - Individual blueprint
- `/contribute` - Contribution page
- `/members` - Members page

## 5. Data Flow

### Content Loading

1. **Build Time:**
   - `getAllBlueprints()` reads files from `/src/content/blueprints` and `/data/recipes`
   - Converts legacy recipes to blueprint format
   - Validates with Zod schema
   - Generates static pages

2. **Runtime:**
   - Client-side filtering and search
   - Dynamic route generation for `/blueprints/[slug]`
   - Member profiles loaded from JSON

### Legacy Support

- Automatically converts old Recipe format to Blueprint format
- Maintains backward compatibility
- Type detection: Tag (has trigger), Rule (has trigger + condition), Snippet (code only)

## 6. Contribution Process

### Workflow

```
User → /contribute → Fill Form → Generate JSON → Copy → GitHub Issue → Community Review → PR → Merge → Deploy
```

### Validation

- **Client-side:** Form validation before JSON generation
- **Server-side:** Zod schema validation on file load
- **CI/CD:** GitHub Actions validate PRs automatically

## 7. Future Enhancements

### Planned Features

1. **GitHub Integration:**
   - Auto-create PR from form submission
   - GitHub OAuth for authenticated contributions
   - Link GitHub issues to blueprints

2. **Community Features:**
   - Voting system for blueprints
   - Comments and discussions
   - Blueprint versioning

3. **Advanced Search:**
   - Full-text search
   - Filter by multiple criteria
   - Saved searches

4. **Analytics:**
   - Track popular blueprints
   - View counts
   - Copy statistics

---

This architecture provides a **solid foundation** for a community-driven open-source library while maintaining **simplicity, performance, and scalability**.

