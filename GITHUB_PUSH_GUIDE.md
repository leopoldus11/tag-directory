# Quick Guide: Push to GitHub from Terminal

## Check Current Status

```bash
# See what files have changed
git status

# See what branch you're on
git branch
```

## If Git is Not Initialized

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: tag.directory

- Complete blueprint system
- Jobs functionality  
- Members and community features
- Precision Monochrome design system
- SEO optimized
- Mobile responsive with view transitions"
```

## Connect to GitHub

```bash
# Add your GitHub remote
git remote add origin https://github.com/leopoldus11/tag-directory.git

# Verify it's added
git remote -v
```

**If you get "remote already exists" error:**
```bash
# Remove existing remote
git remote remove origin

# Add again
git remote add origin https://github.com/leopoldus11/tag-directory.git
```

## Push to GitHub

```bash
# Set main branch (if not already)
git branch -M main

# Push to GitHub
git push -u origin main
```

## If You Get Authentication Errors

**Option 1: Use Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy token
5. When prompted for password, paste the token

**Option 2: Use SSH**
```bash
# Change remote to SSH
git remote set-url origin git@github.com:leopoldus11/tag-directory.git

# Push again
git push -u origin main
```

## Verify Push

1. Go to: `https://github.com/leopoldus11/tag-directory`
2. Check that all files are there
3. Verify personal files (from .gitignore) are NOT visible

---

**That's it! Your code is now on GitHub!** 🚀

