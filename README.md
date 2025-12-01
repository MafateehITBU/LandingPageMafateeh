# Mafateeh Landing Page

Digital marketing agency landing page for Mafateeh Group.

## Features

- 🌐 Bilingual support (English/Arabic)
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📧 Contact form
- 🚀 Optimized for performance

## Development

### Running the Development Servers

This project has two parts:
1. **Frontend** (Vite dev server) - runs on port 3000
2. **Backend** (Express server) - runs on port 3001

You need to run **both servers** for the contact form to work:

#### Option 1: Run Both Servers Separately (Recommended)

**Terminal 1 - Frontend:**
```bash
# Install dependencies (first time only)
pnpm install

# Start Vite dev server (frontend)
pnpm dev
```

**Terminal 2 - Backend:**
```bash
# Start Express server (backend)
# Make sure you have a .env file with Gmail SMTP credentials
NODE_ENV=development tsx server/index.ts
```

Or use the built version:
```bash
pnpm build
NODE_ENV=development node dist/index.js
```

#### Option 2: Use Production Build Locally

```bash
# Build everything
pnpm build

# Start production server (runs both frontend and backend)
pnpm start
```

The server will be available at `http://localhost:3000`

### Build Commands

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section (Settings → Pages)
   - Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
   - Save the settings

2. **Push to main branch**:
   - The GitHub Action will automatically build and deploy your site when you push to the `main` branch
   - Your site will be available at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
   - The base path is automatically configured based on your repository name

3. **Check deployment status**:
   - Go to the "Actions" tab in your repository
   - You'll see the deployment workflow running
   - Once complete, your site will be live

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build for GitHub Pages (replace YOUR-REPO-NAME with your actual repo name)
pnpm run build -- --base=/YOUR-REPO-NAME/

# The built files will be in dist/public/
# You can push the dist/public folder to the gh-pages branch
```

## Email Configuration (Gmail with Nodemailer)

The contact form sends emails using Gmail SMTP via Nodemailer. Follow these steps to configure:

### Step 1: Enable 2-Step Verification on Gmail

1. Go to your Google Account: [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the steps to enable it (if not already enabled)

### Step 2: Generate Gmail App Password

1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter a name like "Mafateeh Landing Page"
5. Click **Generate**
6. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: You won't be able to see this password again, so copy it now!

### Step 3: Configure Environment Variables

#### For Local Development

Create a `.env` file in the project root:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-email@gmail.com
```

**Important Notes:**
- `SMTP_USER`: Your Gmail address (e.g., `saeedfwaz00@gmail.com`)
- `SMTP_PASS`: The 16-character App Password (remove spaces: `abcdefghijklmnop`)
- `FROM_EMAIL`: Usually the same as `SMTP_USER`
- `SMTP_PORT`: Use `587` (STARTTLS) or `465` (SSL)

#### For Render Deployment

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add these environment variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = your-16-character-app-password
FROM_EMAIL = your-email@gmail.com
```

5. Click **Save Changes**
6. Render will automatically redeploy

### Step 4: Test the Configuration

1. Start your server: `pnpm start`
2. Submit the contact form on your website
3. Check the server logs for email confirmation
4. Check `khaled.quzai@mafateehgroup.com` inbox for the email

### Troubleshooting

**Connection Timeout Error:**
- Gmail may block connections from cloud platforms (like Render)
- If this happens, try:
  1. Generate a new App Password
  2. Wait a few minutes and try again
  3. Consider using SendGrid, Mailgun, or Resend as alternatives

**Authentication Failed:**
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify 2-Step Verification is enabled
- Check that the App Password is copied correctly (no spaces)

**Email Not Received:**
- Check spam/junk folder
- Verify the recipient email: `khaled.quzai@mafateehgroup.com`
- Check server logs for error messages

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── assets/  # Images and static assets
│   │   ├── components/
│   │   ├── contexts/
│   │   └── pages/
│   └── public/
├── server/          # Express server (for email API)
└── shared/          # Shared utilities
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express (for server deployment)

## License

MIT

