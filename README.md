# Mafateeh Landing Page

Digital marketing agency landing page for Mafateeh Group.

## Features

- 🌐 Bilingual support (English/Arabic)
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 📧 Contact form
- 🚀 Optimized for performance

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

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

## Email Configuration

### For Server Deployment (with Node.js)

If deploying to a server with Node.js support, configure SMTP settings in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### For GitHub Pages (EmailJS Setup)

The form uses EmailJS for automatic email sending on GitHub Pages. Follow these steps:

1. **Create a free EmailJS account**:
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (200 emails/month free)

2. **Set up Email Service**:
   - Go to "Email Services" in your EmailJS dashboard
   - Add a service (Gmail, Outlook, etc.)
   - Note your Service ID

3. **Create Email Template**:
   - Go to "Email Templates"
   - Create a new template with these variables:
     - `{{to_email}}` - recipient email (set to: khaled.quzai@mafateehgroup.com)
     - `{{from_name}}` - sender name
     - `{{from_email}}` - sender email
     - `{{company}}` - company name
     - `{{phone}}` - phone number
     - `{{message}}` - message content
     - `{{reply_to}}` - reply-to email
   - Note your Template ID

4. **Get Public Key**:
   - Go to "Account" → "General"
   - Copy your Public Key

5. **Add Environment Variables**:
   - For local development, create a `.env` file in the project root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   
   - For GitHub Pages deployment, add these as "Secrets" in your repository:
     - Go to your GitHub repository → Settings → Secrets and variables → Actions
     - Click "New repository secret"
     - Add these three secrets:
       - `VITE_EMAILJS_SERVICE_ID` = your service ID
       - `VITE_EMAILJS_TEMPLATE_ID` = your template ID
       - `VITE_EMAILJS_PUBLIC_KEY` = your public key
     - The GitHub Actions workflow will automatically use these secrets during build

**Note**: The free tier allows 200 emails per month. For production, consider upgrading or using the server-side email option.

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

