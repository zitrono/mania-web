# GitHub Pages Deployment Guide

This guide will help you deploy the Mania Rasstegaeva artist website to GitHub Pages for free hosting.

## Prerequisites

- GitHub account
- Git installed on your computer
- Basic familiarity with Git commands

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository `mania-web` (or any name you prefer)
5. Make sure it's set to "Public"
6. Do NOT initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Initialize Local Git Repository

Open Terminal/Command Prompt and navigate to your project folder:

```bash
cd /Users/zitrono/dev/web/mania
git init
git add .
git commit -m "Initial commit: Mania Rasstegaeva artist website"
```

## Step 3: Connect to GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/mania-web.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 5: Access Your Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/mania-web/
```

**Note:** It may take 5-10 minutes for the site to be available after enabling GitHub Pages.

## Step 6: Update Site URLs (Important!)

Update the following files with your actual GitHub Pages URL:

### In `index.html`:
- Update the `og:url` meta tag
- Update any absolute URLs

### In `sitemap.xml`:
- Replace `https://zitrono.github.io/mania-web/` with your actual URL

### In `robots.txt`:
- Replace the sitemap URL with your actual URL

## Step 7: Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository settings, under "Pages"
2. Enter your custom domain in the "Custom domain" field
3. Create a CNAME file in your repository root with your domain
4. Configure DNS with your domain provider

## Updating the Website

To update the website after making changes:

```bash
git add .
git commit -m "Description of your changes"
git push origin main
```

Changes will be live within a few minutes.

## Troubleshooting

### Site Not Loading
- Check that GitHub Pages is enabled
- Verify the repository is public
- Wait 10-15 minutes after enabling Pages

### CSS/JS Not Loading
- Check file paths in HTML
- Ensure all files are committed and pushed
- Verify case sensitivity in file names

### 404 Errors
- Check that all linked files exist
- Verify relative paths are correct
- Ensure index.html is in the root directory

## Performance Tips

- Images should be optimized for web
- Use webp format for better compression
- Consider using a CDN for larger assets
- Monitor Core Web Vitals in Google Search Console

## SEO Setup

After deployment:

1. Submit your sitemap to Google Search Console
2. Verify ownership of your site
3. Monitor search performance
4. Add structured data markup if needed

## Analytics (Optional)

Add Google Analytics or similar:

1. Create an Analytics account
2. Add the tracking code to your HTML
3. Monitor visitor data and behavior

## Security Headers

GitHub Pages provides basic security headers, but you can enhance them with:

- Content Security Policy
- Additional security headers via meta tags
- HTTPS enforcement (automatic with GitHub Pages)

## Backup Strategy

- Keep local copies of all files
- Consider backing up to multiple repositories
- Document any custom configurations

## Contact

For technical support with this deployment:
- Check GitHub Pages documentation
- Review GitHub Community forums
- Contact repository maintainer

Your Mania Rasstegaeva artist website is now live and professional!