# Deployment Guide

## Vercel Deployment (Recommended)

Vercel is the recommended deployment platform for Next.js applications. It provides:
- Automatic deployments from Git
- Edge network for fast global performance
- Built-in CI/CD
- Preview deployments for pull requests
- Zero-configuration setup

### Quick Deploy

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables (if needed):**
   - In project settings, add any required environment variables
   - For authentication, you'll need to add:
     - `NEXTAUTH_URL` (your production URL)
     - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
     - Database connection strings, etc.

4. **Deploy:**
   - Vercel will automatically build and deploy
   - You'll get a preview URL immediately

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Alternative: GitLab CI/CD

If you prefer GitLab, create `.gitlab-ci.yml`:

```yaml
image: node:20

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - npm install -g vercel
    - vercel --prod --token=$VERCEL_TOKEN
  only:
    - main
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Authentication (when implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Database (when implemented)
DATABASE_URL=your-database-url
```

**Never commit `.env.local` to Git!**

## Production Checklist

- [ ] Set up environment variables in Vercel
- [ ] Configure custom domain (optional)
- [ ] Set up database (if using authentication)
- [ ] Configure authentication provider
- [ ] Test all routes and functionality
- [ ] Set up monitoring/analytics
- [ ] Configure backup strategy

## Post-Deployment

1. **Verify deployment:**
   - Check all routes are accessible
   - Test search functionality
   - Verify static generation works

2. **Set up monitoring:**
   - Vercel Analytics (built-in)
   - Error tracking (Sentry, etc.)

3. **Configure custom domain:**
   - Add domain in Vercel project settings
   - Update DNS records as instructed

## Troubleshooting

### Build Failures
- Check Node.js version (should be 20+)
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run build`

### Runtime Errors
- Check Vercel function logs
- Verify environment variables are set
- Check database connections (if applicable)

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

