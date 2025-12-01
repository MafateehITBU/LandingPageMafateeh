# 🎯 Best Deployment Strategy (100% FREE)

## Recommended Setup

### ✅ Frontend: GitHub Pages (FREE)
- Hosts your React app
- URL: `https://mafateehitbu.github.io/LandingPageMafateeh/`
- Auto-deploys on every push

### ✅ Backend: Render (FREE)
- Hosts your Express server (email functionality)
- URL: `https://mafateeh-landing.onrender.com` (or your custom name)
- 750 hours/month free (enough for always-on)

---

## Quick Start Guide

### 1. Deploy Server to Render (5 minutes)

Follow the detailed guide in `RENDER_DEPLOYMENT.md`:

1. Sign up at [render.com](https://render.com)
2. Create Web Service from GitHub repo
3. Add environment variables (SMTP credentials)
4. Deploy and get your Render URL

### 2. Connect Frontend to Server

Once you have your Render URL:

1. Go to GitHub: `Settings` → `Secrets and variables` → `Actions`
2. Add secret: `VITE_API_URL` = `https://your-app.onrender.com`
3. Push any change to trigger rebuild
4. Your form will now work on GitHub Pages!

---

## How It Works

```
User fills form on GitHub Pages
         ↓
Form sends to Render server (VITE_API_URL)
         ↓
Render server sends email via NodeMailer
         ↓
Email arrives at khaled.quzai@mafateehgroup.com
```

---

## Cost: $0/month

- GitHub Pages: FREE forever
- Render: FREE (750 hours/month = always-on)
- Total: **$0/month** ✅

---

## Files Updated

✅ `client/src/const.ts` - Added configurable API URL
✅ `client/src/pages/Home.tsx` - Uses configurable API URL
✅ `.github/workflows/deploy.yml` - Uses VITE_API_URL secret
✅ `RENDER_DEPLOYMENT.md` - Step-by-step Render guide

---

## Next Steps

1. **Deploy to Render** (follow `RENDER_DEPLOYMENT.md`)
2. **Add VITE_API_URL secret** to GitHub
3. **Test everything** - form should work!

---

## Troubleshooting

**Form not working?**
- Check Render service is running
- Verify VITE_API_URL secret is set correctly
- Check browser console for errors

**Render service sleeping?**
- Free tier sleeps after 15 min inactivity
- First request takes ~30 seconds (wake-up)
- This is normal for free tier

---

## Alternative Free Options

If Render doesn't work for you:

1. **Railway** - $5 credit/month (may run out)
2. **Fly.io** - Limited free tier
3. **Vercel** - Requires serverless conversion

**Render is still the best free option!** 🏆

