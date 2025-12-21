# Quick Start: Setting Up Your GitHub Repository

## 🚀 5-Minute Setup

### 1. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `tag-directory`
3. Description: "An open-source library for tracking scripts and recipes"
4. **Public** visibility
5. **DO NOT** check any initialization options
6. Click **"Create repository"**

### 2. Push Your Code

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit: tag.directory"

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tag-directory.git
git branch -M main
git push -u origin main
```

### 3. Update Repository URLs

Find and replace `YOUR_USERNAME` or `your-org` with your actual GitHub username in:

- `README.md` (2 places)
- `CONTRIBUTING.md` (3 places)
- `app/contribute/page.tsx` (1 place)

**Quick command:**
```bash
# Replace YOUR_USERNAME with your actual username
find . -type f -name "*.md" -o -name "*.tsx" | xargs sed -i '' 's/YOUR_USERNAME/your-actual-username/g'
find . -type f -name "*.md" -o -name "*.tsx" | xargs sed -i '' 's/your-org/your-actual-username/g'
```

### 4. Enable GitHub Features

1. Go to your repository on GitHub
2. **Settings** → **Actions** → **General**
   - Workflow permissions: **Read and write**
   - Allow GitHub Actions to create PRs: **✅**
3. **Settings** → **General**
   - ✅ Issues
   - ✅ Discussions (optional)

### 5. Set Up Labels (Optional)

```bash
# Install GitHub CLI if needed: brew install gh
gh auth login
./scripts/setup-github-labels.sh
```

### 6. Test It!

1. Create a test branch:
   ```bash
   git checkout -b test-contribution
   ```

2. Add a test blueprint:
   ```bash
   mkdir -p src/content/blueprints
   # Create a simple test file
   ```

3. Push and create a PR:
   ```bash
   git add .
   git commit -m "Test: Add test blueprint"
   git push origin test-contribution
   ```

4. Go to GitHub and create a Pull Request
5. Watch GitHub Actions validate your PR! ✨

## ✅ You're Ready!

Your repository is now set up for community contributions. Share it and start accepting PRs!

## Next Steps

- Add initial blueprints to show examples
- Deploy to Vercel
- Share with the community
- Start accepting contributions!

