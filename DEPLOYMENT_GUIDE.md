# Step-by-Step GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed on your computer
- All code changes saved

---

## Step 1: Initialize Git Repository

```bash
# Navigate to your project directory
cd "/Users/mafateehgroup/Downloads/Landing Page Code Mafateeh/mafateeh-landing"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit - Mafateeh landing page"
```

---

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `mafateeh-landing` (or any name you prefer)
4. Description: "Mafateeh Group Landing Page"
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

---

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/mafateeh-landing.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You'll be asked for your GitHub username and password (or personal access token)

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
5. Click **"Save"**

---

## Step 5: Verify Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, go back to **Settings → Pages**
5. You'll see your site URL: `https://YOUR-USERNAME.github.io/mafateeh-landing/`

---

## Step 6: Future Updates

Whenever you make changes:

```bash
# Add your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

The GitHub Action will automatically rebuild and redeploy your site!

---

## Troubleshooting

### If GitHub Actions fails:
- Check the "Actions" tab for error messages
- Make sure all dependencies are in `package.json`
- Verify the workflow file exists at `.github/workflows/deploy.yml`

### If site shows 404:
- Wait a few minutes (deployment can take 5-10 minutes)
- Check that GitHub Pages source is set to "GitHub Actions"
- Verify your repository name matches the base path in the workflow

### If you need to change repository name:
- Update the base path in `.github/workflows/deploy.yml` if needed
- The workflow automatically detects the repo name, so usually no changes needed

---

## Important Notes

⚠️ **GitHub Pages is static only** - The email form will need the server running separately, or you'll need to:
- Deploy the server to Railway, Render, Vercel, etc.
- Update the form to call your server's URL instead of `/api/contact`

For now, the form will show an error on GitHub Pages until you deploy the server separately.

