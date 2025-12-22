# Phase 1: Deployment Guide - Step by Step

## Overview

This guide walks you through deploying tag.directory to production, from pushing to GitHub to going live with a custom domain.

**Estimated Time:** 1-2 hours  
**Difficulty:** Beginner-friendly

---

## Step 1: Push to GitHub

### 1.1 Check Current Status

First, let's see what we have:

```bash
# Check git status
git status

# See what branch you're on
git branch
```

### 1.2 Initialize Git (If Not Already Done)

If you haven't initialized git yet:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: tag.directory v1.0

- Complete blueprint system with platform-aware display
- Jobs functionality
- Members and community features
- Precision Monochrome design system
- SEO optimized
- Mobile responsive with view transitions"
```

### 1.3 Connect to GitHub Repository

**Option A: Repository Already Exists on GitHub**

```bash
# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/leopoldus11/tag-directory.git

# Verify remote
git remote -v
```

**Option B: Create New Repository on GitHub First**

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `tag-directory`
3. Description: "Open-source library for tracking scripts and recipes"
4. **Public** visibility
5. **DO NOT** initialize with README/gitignore/license
6. Click "Create repository"
7. Then run:

```bash
git remote add origin https://github.com/leopoldus11/tag-directory.git
```

### 1.4 Push to GitHub

```bash
# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you get authentication errors:**
- Use GitHub Personal Access Token instead of password
- Or use SSH: `git remote set-url origin git@github.com:leopoldus11/tag-directory.git`

### 1.5 Verify Push

1. Go to `https://github.com/leopoldus11/tag-directory`
2. Verify all files are there
3. Check that personal files (from .gitignore) are NOT visible

---

## Step 2: Connect to Vercel

### 2.1 Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. In Vercel dashboard, click **"Add New Project"**
2. You'll see your GitHub repositories
3. Find **"leopoldus11/tag-directory"**
4. Click **"Import"**

### 2.3 Configure Project Settings

Vercel will auto-detect Next.js, but verify:

**Project Name:**
- `tag-directory` (or your preferred name)

**Framework Preset:**
- Should show: **Next.js** ✅

**Root Directory:**
- Leave as **`./`** (root)

**Build Command:**
- Should show: **`npm run build`** ✅

**Output Directory:**
- Should show: **`.next`** ✅

**Install Command:**
- Should show: **`npm install`** ✅

### 2.4 Environment Variables (Optional for Now)

For Phase 1, you might not need any. But if you want to set the site URL:

1. Click **"Environment Variables"**
2. Add:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://tag-directory.vercel.app` (or your custom domain later)
   - **Environment:** Production, Preview, Development (all)

3. Click **"Add"**

### 2.5 Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. Watch the build logs in real-time

**What happens:**
- Vercel installs dependencies
- Runs `npm run build`
- Deploys to edge network
- Provides you with a URL

---

## Step 3: Test Deployment

### 3.1 Access Your Site

After deployment, you'll get a URL like:
- `https://tag-directory-abc123.vercel.app`
- Or `https://tag-directory.vercel.app` (if available)

### 3.2 Test Checklist

**Homepage:**
- [ ] Loads correctly
- [ ] Search bar works
- [ ] All sections visible
- [ ] Links work

**Navigation:**
- [ ] All nav items work
- [ ] Mobile menu works (if applicable)

**Blueprints:**
- [ ] Listing page loads
- [ ] Filters work
- [ ] Detail pages load
- [ ] Code blocks display correctly

**Other Pages:**
- [ ] Jobs page loads
- [ ] Members page loads
- [ ] Contribute page loads
- [ ] Standards page loads

**Mobile:**
- [ ] Test on phone browser
- [ ] Responsive layout works
- [ ] Touch targets are adequate
- [ ] No horizontal scroll

**Performance:**
- [ ] Pages load quickly
- [ ] Images optimize
- [ ] No console errors

### 3.3 Fix Any Issues

If you find issues:
1. Fix locally
2. Commit changes: `git commit -m "Fix: [description]"`
3. Push: `git push`
4. Vercel auto-deploys (usually < 2 minutes)

---

## Step 4: Purchase Domain

### 4.1 Choose Domain Registrar

**Recommended:**
- **Namecheap** (popular, good prices)
- **Google Domains** (now Squarespace Domains)
- **Cloudflare** (cheapest, no markup)
- **Vercel** (can buy directly in Vercel)

**Domain Options:**
- `tag.directory` - Short, memorable
- `tracking.directory` - Descriptive
- `tagman.directory` - Creative

### 4.2 Check Domain Availability

1. Go to your chosen registrar
2. Search for your desired domain
3. Check pricing (`.directory` domains vary)
4. Add to cart

### 4.3 Purchase Domain

1. Complete purchase
2. Wait for domain to activate (usually instant, max 24 hours)
3. You'll receive DNS management access

---

## Step 5: Connect Domain to Vercel

### 5.1 Add Domain in Vercel

1. Go to your Vercel project
2. Click **"Settings"** tab
3. Click **"Domains"** in sidebar
4. Enter your domain: `tag.directory` (or your chosen domain)
5. Click **"Add"**

### 5.2 Configure DNS

Vercel will show you DNS records to add:

**Option A: Use Vercel Nameservers (Easiest)**
1. Vercel provides nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
2. Go to your domain registrar
3. Update nameservers to Vercel's
4. Wait for propagation (usually < 1 hour)

**Option B: Add DNS Records (More Control)**
1. Vercel provides DNS records:
   - Type: `A` or `CNAME`
   - Name: `@` or `www`
   - Value: Vercel's IP or domain
2. Go to your domain registrar's DNS settings
3. Add the records
4. Wait for propagation (usually < 1 hour)

### 5.3 Verify Domain

1. Vercel will automatically verify
2. Status will show "Valid" when ready
3. SSL certificate auto-provisions (HTTPS)

### 5.4 Update Environment Variable

1. Go to Vercel project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
3. Redeploy (or wait for next deployment)

---

## Step 6: Final Steps

### 6.1 Update Repository URLs

Update any hardcoded URLs in your code:
- `README.md` - Update GitHub URLs
- `CONTRIBUTING.md` - Update site URLs
- `app/contribute/page.tsx` - Update GitHub repo URL

### 6.2 Test Everything Again

With your custom domain:
- [ ] Site loads at `https://tag.directory`
- [ ] HTTPS works (SSL certificate)
- [ ] All routes work
- [ ] Mobile works
- [ ] SEO metadata works

### 6.3 Set Up Monitoring (Optional)

**Vercel Analytics:**
1. Go to project → Analytics
2. Enable Vercel Analytics (free tier available)

**Error Tracking (Optional):**
- Consider Sentry for error tracking
- Or Vercel's built-in error logs

---

## Troubleshooting

### Build Fails on Vercel

**Check:**
1. Build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check for TypeScript errors
4. Verify all dependencies in `package.json`

**Common Issues:**
- Missing environment variables
- Node version mismatch (Vercel uses Node 20 by default)
- File path issues (case sensitivity)

### Domain Not Working

**Check:**
1. DNS propagation: Use [whatsmydns.net](https://www.whatsmydns.net)
2. Nameservers are correct
3. DNS records are correct
4. Wait up to 24 hours for full propagation

### Site Not Loading

**Check:**
1. Vercel deployment status
2. Domain DNS settings
3. SSL certificate status
4. Browser cache (try incognito)

---

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Repository is public and accessible
- [ ] Vercel project created and connected
- [ ] Initial deployment successful
- [ ] All pages tested and working
- [ ] Mobile tested and responsive
- [ ] Domain purchased
- [ ] Domain connected to Vercel
- [ ] SSL certificate active (HTTPS)
- [ ] Site accessible at custom domain
- [ ] SEO metadata working
- [ ] Sitemap accessible at `/sitemap.xml`

---

## Next Steps After Deployment

1. **Share with community** - Get feedback
2. **Monitor analytics** - See what's popular
3. **Add more content** - More blueprints, jobs
4. **Iterate** - Based on real usage

**Congratulations! Your site is live! 🎉**

