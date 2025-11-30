# 🔧 Fix Gmail SMTP Timeout on Render

## Problem
Gmail SMTP connection times out on Render cloud platform.

## Solution 1: Use Port 465 with SSL (Recommended)

Gmail's port 465 with SSL is more reliable on cloud platforms than port 587.

### Update Environment Variables in Render:

1. Go to your Render service → **Environment** tab
2. Update `SMTP_PORT` from `587` to `465`
3. Render will automatically redeploy

**Or** update in Render dashboard:
- `SMTP_PORT` = `465` (instead of 587)

---

## Solution 2: Use Different SMTP Service (If Gmail Still Fails)

If Gmail continues to timeout, consider these free alternatives:

### Option A: SendGrid (Free - 100 emails/day)
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Update Render environment variables:
   ```
   SMTP_HOST = smtp.sendgrid.net
   SMTP_PORT = 587
   SMTP_USER = apikey
   SMTP_PASS = your_sendgrid_api_key
   ```

### Option B: Mailgun (Free - 5,000 emails/month)
1. Sign up at [mailgun.com](https://mailgun.com)
2. Get SMTP credentials
3. Update Render environment variables with Mailgun SMTP settings

### Option C: Resend (Free - 3,000 emails/month)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Use Resend API instead of SMTP (requires code change)

---

## Solution 3: Check Gmail Settings

If you want to stick with Gmail:

1. **Enable 2-Step Verification** (if not already)
2. **Create App Password**:
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"
   - Use this password instead of your regular password

3. **Check "Less secure app access"** (if available):
   - Some accounts might need this enabled
   - Google Account → Security → Less secure app access

---

## What I've Updated in Code

✅ **Skipped verification in production** - Gmail times out during verify()
✅ **Added connection timeouts** - Better error handling
✅ **Added connection pooling** - More reliable connections

The code will now try to send emails even if verification fails.

---

## Quick Fix: Try Port 465

**Easiest solution**: Change `SMTP_PORT` to `465` in Render environment variables.

This uses SSL directly instead of STARTTLS, which is more reliable on cloud platforms.

---

## Test After Fix

1. Update environment variables in Render
2. Wait for redeploy (2-3 minutes)
3. Test the contact form
4. Check Render logs for any errors

