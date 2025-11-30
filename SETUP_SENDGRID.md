# 🚀 Setup SendGrid for Email (FREE - 100 emails/day)

## Why SendGrid?
- ✅ **100% FREE** - 100 emails per day
- ✅ **Works perfectly** with cloud platforms (Render, Railway, etc.)
- ✅ **No connection timeouts** - Unlike Gmail
- ✅ **Easy setup** - Just need API key

---

## Step 1: Create SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com)
2. Click **"Start for Free"**
3. Sign up with your email
4. Verify your email address

---

## Step 2: Create API Key

1. After logging in, go to **Settings** → **API Keys** (left sidebar)
2. Click **"Create API Key"**
3. Name it: `Mafateeh Landing Page`
4. Select **"Full Access"** (or "Restricted Access" with Mail Send permission)
5. Click **"Create & View"**
6. **COPY THE API KEY** - You'll only see it once!
   - It looks like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Step 3: Verify Sender Email (Required)

1. Go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in the form:
   - **From Email**: `saeedfwaz00@gmail.com` (or your email)
   - **From Name**: `Mafateeh Group`
   - **Reply To**: `saeedfwaz00@gmail.com`
   - Fill in other required fields
4. Check your email and click the verification link
5. Wait for verification (usually instant)

---

## Step 4: Update Render Environment Variables

1. Go to your Render service: `landingpagemafateeh`
2. Go to **Environment** tab
3. Update these variables:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.sendgrid.net` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `apikey` (literally the word "apikey") |
| `SMTP_PASS` | `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your SendGrid API key) |

4. Click **"Save Changes"**
5. Render will automatically redeploy

---

## Step 5: Test

1. Wait for Render to redeploy (2-3 minutes)
2. Go to your site: https://landingpagemafateeh.onrender.com/
3. Submit the contact form
4. Check the email inbox: `khaled.quzai@mafateehgroup.com`
5. Check Render logs to confirm email was sent

---

## Important Notes

- ✅ **Free tier**: 100 emails per day (plenty for a contact form)
- ✅ **No credit card required** for free tier
- ✅ **Works immediately** after setup
- ✅ **No connection issues** with cloud platforms

---

## Troubleshooting

**Email not sending?**
- Check SendGrid API key is correct
- Verify sender email is verified in SendGrid
- Check Render logs for errors

**API key not working?**
- Make sure you copied the full key (starts with `SG.`)
- Regenerate if needed (old keys won't work)

**Sender not verified?**
- Check your email for verification link
- Make sure you clicked it

---

## Alternative: Mailgun (If SendGrid doesn't work)

If you prefer Mailgun (5,000 emails/month free):

1. Sign up at [mailgun.com](https://mailgun.com)
2. Get SMTP credentials from dashboard
3. Update Render environment variables with Mailgun settings

---

## Done! 🎉

Your emails should now work perfectly on Render!

