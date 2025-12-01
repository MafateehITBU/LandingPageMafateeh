# 🚀 Deploy to Render (FREE) - Step by Step Guide

## Why Render?
- ✅ **100% FREE** - 750 hours/month (enough for always-on)
- ✅ **Easy setup** - Deploy from GitHub in minutes
- ✅ **Node.js support** - Your Express server works perfectly
- ✅ **Automatic SSL** - HTTPS included
- ✅ **Auto-deploy** - Updates automatically when you push to GitHub

---

## Step 1: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (recommended)

---

## Step 2: Create New Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** (if not already connected)
3. Select your repository: **`MafateehITBU/LandingPageMafateeh`**
4. Click **"Connect"**

---

## Step 3: Configure Your Service

Fill in these settings:

- **Name**: `mafateeh-landing` (or any name you like)
- **Environment**: Select **`Node`**
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: Leave empty (or `./`)
- **Build Command**: 
  ```
  pnpm install && pnpm run build
  ```
- **Start Command**: 
  ```
  pnpm run start
  ```
- **Plan**: Select **`Free`** (750 hours/month)

---

## Step 4: Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"** → Click **"Add Environment Variable"**

Add these 4 variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `saeedfwaz00@gmail.com` |
| `SMTP_PASS` | `ders orhd zvbc ruqp` |

Click **"Save Changes"** after adding each one.

---

## Step 5: Deploy

1. Scroll down and click **"Create Web Service"**
2. Render will start building your app (takes 5-10 minutes first time)
3. You'll see build logs in real-time
4. Wait for **"Your service is live"** message

---

## Step 6: Get Your Server URL

Once deployed, you'll see:
- **Your service URL**: `https://mafateeh-landing.onrender.com` (or your custom name)

**Copy this URL** - you'll need it in the next step!

---

## Step 7: Update Frontend to Use Render Server

### Option A: Update GitHub Pages (Recommended)

1. Go to your GitHub repository: `MafateehITBU/LandingPageMafateeh`
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://mafateeh-landing.onrender.com` (your Render URL)
5. Click **"Add secret"**

The GitHub Actions workflow will automatically use this when building for GitHub Pages!

### Option B: Update Locally and Push

If you want to test locally first:

1. Create `.env` file in root (if not exists):
   ```env
   VITE_API_URL=https://mafateeh-landing.onrender.com
   ```

2. Restart your dev server:
   ```bash
   pnpm dev
   ```

3. Test the form - it should now call your Render server!

---

## Step 8: Test Everything

1. **Test on Render**: Visit your Render URL and submit the contact form
2. **Test on GitHub Pages**: Visit your GitHub Pages URL and submit the form
3. **Check email**: Verify emails arrive at `khaled.quzai@mafateehgroup.com`

---

## ✅ You're Done!

Your setup:
- ✅ **Frontend**: GitHub Pages (free) - `https://mafateehitbu.github.io/LandingPageMafateeh/`
- ✅ **Backend**: Render (free) - `https://mafateeh-landing.onrender.com`
- ✅ **Email**: Working via NodeMailer on Render

---

## Future Updates

When you make changes:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Both deploy automatically**:
   - GitHub Pages rebuilds via GitHub Actions
   - Render redeploys automatically

---

## Troubleshooting

### Render service goes to sleep?
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (wake-up time)
- This is normal for free tier

### Email not working?
- Check Render logs: Go to your service → "Logs" tab
- Verify environment variables are set correctly
- Check Gmail app password is correct

### Form shows error?
- Make sure `VITE_API_URL` is set correctly
- Check browser console for errors
- Verify Render service is running (not sleeping)

---

## Need Help?

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com

