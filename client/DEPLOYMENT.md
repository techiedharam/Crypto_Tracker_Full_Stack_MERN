# CryptoTracker Deployment Guide

## Vercel Deployment Steps

### 1. Prepare for Deployment
```bash
# Clean install dependencies
npm ci
# Build the project locally to test
npm run build
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set the **Root Directory** to `client` (important!)
4. Use these settings:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm ci`

### 3. Environment Variables (if needed)
If you have any environment variables, add them in Vercel dashboard under Settings > Environment Variables.

### 4. Custom Domain (optional)
Add your custom domain in the Vercel dashboard under Settings > Domains.

## Troubleshooting

### 404 Errors
- Ensure Root Directory is set to `client`
- Check that vercel.json is present in the client folder
- Verify all routes are properly configured

### Build Errors
- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all dependencies are installed

## Project Structure
```
client/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── login/
│       ├── signup/
│       └── dashboard/
├── vercel.json
├── next.config.ts
└── package.json
```
