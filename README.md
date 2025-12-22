# tracking.directory

An open-source library for tracking scripts and recipes (GTM tags, Adobe Launch rules, etc.). Built for digital engineers, freelance developers, and agencies who need reliable, tested tracking implementations.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Contribute

### 1. Fork the Repo

### 2. Adding a New Tag

If you want to submit a **new tag** that does not already exist, follow these steps:

1. **Create a Tag File**:
   
   Create a new file in the `src/content/tags/` directory with the appropriate name. For example, if you're adding a tag for GA4 Enhanced Ecommerce, name the file `gtm-ga4-enhanced-ecommerce.json`.

2. **Define the Tag**:
   
   Add your tag data inside the newly created file. Refer to the existing tags for formatting guidance. Make sure your tags are accurate, clear, and helpful to developers.

   Your tags should:
   - Be accurate and related to the tracking implementation
   - Be clearly worded to help developers understand and use them easily
   - Be actionable, providing steps or insights to solve common problems
   - Test your tags: Before submitting, ensure that your tags have been tested and work as expected in the relevant development environment

3. **Important Parameters in Tag Files**:

   When creating tags, be sure to include the following parameters:

   - **id**: Unique identifier (lowercase, hyphens, no spaces)
   - **slug**: URL-friendly identifier (usually same as id)
   - **title**: Display name
   - **author**: Your GitHub username (or array of usernames)
   - **platform**: GTM, Adobe Launch, Tealium, GA4, Meta, etc.
   - **type**: "Tag", "Rule", or "Snippet"
   - **content**: Code snippet (Markdown or JavaScript)
   - **description**: Brief description (optional)
   - **triggers**: When the script runs (optional)
   - **conditions**: Conditions for execution (optional)

### 3. Adding New Content to Existing Tags

If you want to add new content to an existing tag, follow these steps:

1. **Find the Existing Tag**:
   
   Navigate to the `src/content/tags/` directory and open the relevant file.

2. **Update the Tag**:
   
   Make your changes, ensuring that your additions are tested.

### 4. Validate Your Changes

Before submitting, validate your changes:

```bash
npm run validate:all
```

### 5. Create a PR

Submit your Pull Request with a clear description of what you've added or changed.

## Content Structure

- **Tags**: `src/content/tags/*.json` - GTM tags, Adobe Launch rules, etc.
- **Scripts**: `data/scripts/*.json` - Reusable code snippets
- **Standards**: `data/standards/*.json` - Best practices

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Zod**: Runtime validation
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

Made with ❤️ by the digital engineering community
