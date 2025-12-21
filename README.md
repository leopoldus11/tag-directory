# tag.directory

An open-source library for tracking scripts and recipes (GTM tags, Adobe Launch rules, etc.). Built for digital engineers, freelance developers, and agencies who need reliable, tested tracking implementations.

[![Contributors](https://img.shields.io/github/contributors/leopoldus11/tag-directory)](https://github.com/leopoldus11/tag-directory/graphs/contributors)
[![License](https://img.shields.io/github/license/leopoldus11/tag-directory)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Features

- 🎯 **Curated Blueprints**: Pre-built tracking blueprints for common use cases
- 📜 **Reusable Scripts**: Custom code snippets that can be used in blueprints
- 🏷️ **Category Filters**: Filter by platform (GTM, Adobe Launch, Tealium, GA4, Meta, etc.) and use case
- 📋 **Quick Copy**: One-click copy for code snippets
- 🔍 **Powerful Search**: Find blueprints quickly with Cmd+K search
- 📊 **Standards**: Community-driven best practices for tracking implementations
- 👥 **Members**: Connect with the tracking community
- 🌙 **Dark Mode**: Beautiful dark mode interface
- ⚡ **Fast**: Static generation for optimal performance
- 🤝 **Open Source**: Contribute your own blueprints via Pull Requests

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/leopoldus11/tag-directory.git
cd tag-directory

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
tag-directory/
├── app/                    # Next.js app directory
│   ├── blueprints/        # Blueprint pages
│   ├── scripts/           # Script pages
│   ├── standards/         # Best practices/standards
│   ├── members/           # Community members
│   ├── contribute/        # Contribution page
│   └── api/               # API routes
├── src/content/           # Blueprint content
│   └── blueprints/        # Blueprint files (.json or .mdc)
├── data/                  # Data files
│   ├── recipes/          # Legacy recipes (migrated automatically)
│   ├── scripts/          # Script files
│   ├── standards/        # Standard files
│   └── authors/          # Author profiles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── member-profile.tsx # Member profile component
│   ├── code-block.tsx    # Code highlighting
│   └── ...
├── lib/                  # Utilities
│   ├── schemas/          # Zod schemas
│   ├── blueprints.ts     # Blueprint loading
│   └── authors.ts        # Author management
└── types/                # TypeScript types
```

## Understanding Blueprints

### Blueprints
Blueprints are abstractions of tracking implementations (like GTM tags or Adobe Launch rules). They include:
- **Type**: Tag (GTM-style), Rule (Adobe Launch-style), or Snippet
- **Platform**: GTM, Adobe Launch, Tealium, GA4, Meta, etc.
- **Triggers**: When the script should run
- **Conditions**: Conditions under which the script runs
- **Content**: Custom Code or Code from Extensions that executes

### Scripts
Scripts are reusable code snippets that can be implemented as Custom Code in Blueprints. They are standalone code blocks that can be used across multiple blueprints.

## Contributing

tag.directory is a **community-driven open-source library**. All content is managed through GitHub Pull Requests.

### Quick Start

1. **Fork** the repository
2. **Add** your blueprint/script/standard in the appropriate directory
3. **Validate** locally: `npm run validate:all`
4. **Submit** a Pull Request

### Contribution Guide

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the complete contribution workflow, including:
- Content format and schemas
- Validation process
- PR submission guidelines
- Community review process

### Content Directories

- **Blueprints**: [src/content/blueprints/](./src/content/blueprints/) (create new files here)
- **Scripts**: [data/scripts/README.md](./data/scripts/README.md)
- **Standards**: [data/standards/README.md](./data/standards/README.md)

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Zod**: Runtime validation
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Shiki**: Code syntax highlighting
- **Static Generation**: Fast, pre-rendered pages

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically

## Roadmap

- [ ] Authentication system (Sign up/Login)
- [ ] User profiles and contributions
- [ ] Blueprint/script submission workflow
- [ ] Voting system for standards
- [ ] Comments and discussions
- [ ] Analytics integration
- [ ] API for programmatic access

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Acknowledgments

- Inspired by [cursor.directory](https://cursor.directory)
- Built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)

## Community

- 📖 [Documentation](./CONTRIBUTING.md)
- 💬 [Discussions](https://github.com/leopoldus11/tag-directory/discussions)
- 🐛 [Issues](https://github.com/leopoldus11/tag-directory/issues)
- 📝 [Contributing Guide](./CONTRIBUTING.md)

---

Made with ❤️ by the digital engineering community
