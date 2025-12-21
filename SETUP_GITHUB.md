# Setting Up Your GitHub Repository

This guide will help you set up your GitHub repository for tag.directory with all the necessary configuration for community contributions.

## Step 1: Create the Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `tag-directory` (or your preferred name)
4. Description: "An open-source library for tracking scripts and recipes (GTM tags, Adobe Launch rules, etc.)"
5. Visibility: **Public** (required for open source)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## Step 2: Update Repository URLs

After creating the repo, update these files with your actual GitHub URL:

### Files to Update:

1. **README.md** - Replace `your-org/tag-directory` with your actual org/username
2. **CONTRIBUTING.md** - Replace `your-org/tag-directory` with your actual org/username
3. **app/contribute/page.tsx** - Update the GitHub repository link
4. **.github/workflows/validate-pr.yml** - Already uses `context.repo` (auto-detected)

### Quick Find & Replace:

```bash
# Replace with your actual GitHub username/org
# Example: if your username is "maydayv" and repo is "tag-directory"
# Replace: your-org/tag-directory
# With: maydayv/tag-directory
```

## Step 3: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: tag.directory open-source library"

# Add your GitHub remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/tag-directory.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 4: Configure Repository Settings

### Enable GitHub Actions

1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select: **"Read and write permissions"**
3. Check: **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

### Enable Issues and Discussions

1. Go to repository **Settings** → **General**
2. Under "Features", ensure:
   - ✅ **Issues** is enabled
   - ✅ **Discussions** is enabled (optional but recommended)
3. Click **Save**

### Set Up Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

## Step 5: Configure GitHub Actions Secrets (If Needed)

If you add features that require API keys or secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add any required secrets (e.g., `NEXTAUTH_SECRET`, database URLs)

## Step 6: Test the Workflow

### Test PR Validation

1. Create a test branch:
   ```bash
   git checkout -b test-pr-validation
   ```

2. Add a test blueprint:
   ```bash
   # Create a test file
   echo '{"id":"test-blueprint","slug":"test-blueprint","title":"Test","author":"test","platform":"GTM","type":"Tag","content":"console.log(\"test\");","community_verified":false}' > src/content/blueprints/test-blueprint.json
   ```

3. Commit and push:
   ```bash
   git add src/content/blueprints/test-blueprint.json
   git commit -m "Test: Add test blueprint"
   git push origin test-pr-validation
   ```

4. Create a PR on GitHub
5. Check that GitHub Actions runs and validates the PR

### Test Contribution Form

1. Deploy to Vercel (or run locally)
2. Go to `/contribute` page
3. Fill out the form
4. Generate JSON
5. Create a GitHub issue with the JSON
6. Verify the issue appears correctly

## Step 7: Add Repository Topics

Add topics to help people discover your repo:

1. Go to repository main page
2. Click the gear icon next to "About"
3. Add topics:
   - `tracking`
   - `analytics`
   - `gtm`
   - `adobe-launch`
   - `digital-analytics`
   - `open-source`
   - `nextjs`
   - `typescript`

## Step 8: Create Initial Content

Before opening to the community, add a few example blueprints:

1. Migrate existing recipes to `/src/content/blueprints/`
2. Add yourself to `data/authors/authors.json`
3. Create a few example blueprints to show the format

## Step 9: Set Up Vercel Deployment

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js settings
4. Deploy!

## Step 10: Announce Your Repository

Once everything is set up:

1. Update the README with your actual repository URL
2. Add a description and topics
3. Create a "Good First Issue" label for beginner-friendly contributions
4. Consider writing a blog post or announcing on social media

## Repository Checklist

- [ ] Repository created and public
- [ ] Code pushed to GitHub
- [ ] README.md updated with correct URLs
- [ ] CONTRIBUTING.md updated
- [ ] GitHub Actions enabled
- [ ] Issues enabled
- [ ] Discussions enabled (optional)
- [ ] Branch protection configured (optional)
- [ ] Repository topics added
- [ ] Initial content added
- [ ] Vercel deployment configured
- [ ] Test PR created and validated
- [ ] Contribution form tested

## Next Steps

1. **Add Initial Blueprints**: Create a few example blueprints to show the format
2. **Invite Contributors**: Share the repository with potential contributors
3. **Create Good First Issues**: Label some issues as "good first issue" for newcomers
4. **Set Up Discussions**: Use GitHub Discussions for community Q&A
5. **Documentation**: Keep documentation up to date as the project evolves

## Troubleshooting

### GitHub Actions Not Running

- Check repository Settings → Actions → General
- Ensure workflows are enabled
- Check if you need to enable Actions in organization settings

### PR Validation Failing

- Run `npm run validate:all` locally first
- Check the GitHub Actions logs for specific errors
- Ensure your blueprint follows the schema

### Contribution Form Not Working

- Check browser console for errors
- Ensure the form is client-side (has "use client")
- Test JSON generation locally

---

Your repository is now ready for community contributions! 🚀

