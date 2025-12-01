import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env");

console.log("📁 Loading .env file from:", envPath);
const envResult = dotenv.config({ path: envPath });

if (envResult.error) {
  console.error("❌ Error loading .env file:", envResult.error);
} else {
  console.log("✅ .env file loaded successfully");
  // Log which SMTP variables are set (without showing values)
  console.log("SMTP_HOST:", process.env.SMTP_HOST ? "✅ Set" : "❌ Missing");
  console.log("SMTP_PORT:", process.env.SMTP_PORT ? "✅ Set" : "❌ Missing");
  console.log("SMTP_USER:", process.env.SMTP_USER ? "✅ Set" : "❌ Missing");
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "✅ Set" : "❌ Missing");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // CORS middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Email API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, company, phone, email, message } = req.body;

      // Validate required fields
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Validate SMTP configuration
      const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
      const smtpPort = parseInt(process.env.SMTP_PORT || "587");
      const smtpUser = process.env.SMTP_USER;
      // Remove spaces from App Password (Gmail App Passwords are 16 characters, sometimes copied with spaces)
      const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "") || process.env.SMTP_PASS;
      
      console.log("\n📧 Contact form submission received");
      console.log("SMTP Configuration:");
      console.log("  Host:", smtpHost);
      console.log("  Port:", smtpPort);
      console.log("  User:", smtpUser);
      console.log("  Pass:", smtpPass ? `✅ Set (${smtpPass.length} chars)` : "❌ Missing");

      if (!smtpUser || !smtpPass) {
        console.error("❌ SMTP credentials not configured.");
        console.error("SMTP_USER:", smtpUser ? "✅ Set" : "❌ Missing");
        console.error("SMTP_PASS:", smtpPass ? "✅ Set" : "❌ Missing");
        console.error("Make sure you have a .env file with SMTP credentials in the project root.");
        return res.status(500).json({ 
          error: "Email service not configured. Please check server environment variables.",
          details: process.env.NODE_ENV === "development" 
            ? "Missing SMTP_USER or SMTP_PASS in .env file" 
            : undefined
        });
      }

      // Create Gmail transporter with standard SMTP settings
      console.log("📧 Configuring Gmail SMTP...");
      console.log("Host:", smtpHost);
      console.log("Port:", smtpPort);
      console.log("User:", smtpUser);
      console.log("Password length:", smtpPass?.length || 0);
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
        auth: {
          user: smtpUser,
          pass: smtpPass, // Gmail App Password (not regular password)
        },
        // Standard Gmail SMTP settings
        tls: {
          rejectUnauthorized: false,
          ciphers: 'SSLv3'
        },
        // Connection settings
        connectionTimeout: 30000, // 30 seconds
        greetingTimeout: 30000, // 30 seconds
        socketTimeout: 30000, // 30 seconds
      });

      // Verify SMTP connection (only in development to avoid timeouts in production)
      if (process.env.NODE_ENV === "development") {
        try {
          await transporter.verify();
          console.log("✅ Gmail SMTP server is ready to send emails");
        } catch (verifyError) {
          console.error("⚠️ SMTP verification failed:", verifyError);
          console.log("⚠️ Will attempt to send email anyway...");
        }
      } else {
        console.log("📧 Gmail SMTP configured (skipping verification in production)");
      }

      // Email content
      // For Gmail: from email should be the same as smtpUser
      const fromEmail = process.env.FROM_EMAIL || smtpUser;
      const mailOptions = {
        from: `"${name}" <${fromEmail}>`,
        to: "khaled.quzai@mafateehgroup.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message || "No message provided"}</p>
          <hr>
          <p><small>Reply to: ${email}</small></p>
        `,
        replyTo: email,
      };

      // Send email
      console.log("📧 Attempting to send email...");
      console.log("From:", fromEmail);
      console.log("To: khaled.quzai@mafateehgroup.com");
      
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
      console.log("Message ID:", info.messageId);

      res.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("❌ Error sending email:");
      console.error("Error message:", error?.message);
      console.error("Error code:", error?.code);
      console.error("Error command:", error?.command);
      console.error("Error response:", error?.response);
      
      const errorMessage = error?.message || "Failed to send email";
      const errorCode = error?.code;
      
      // Provide helpful error messages
      let userFriendlyError = "Failed to send email";
      if (errorCode === "ETIMEDOUT" || errorCode === "ECONNREFUSED") {
        userFriendlyError = "Cannot connect to Gmail server. Please check your internet connection and try again.";
      } else if (errorCode === "EAUTH") {
        userFriendlyError = "Gmail authentication failed. Please check your App Password.";
      } else if (errorMessage.includes("Invalid login")) {
        userFriendlyError = "Invalid Gmail credentials. Please check your App Password.";
      }
      
      res.status(500).json({ 
        error: userFriendlyError,
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Use port 3001 in development (Vite uses 3000), 3000 in production
  const port = process.env.PORT || (process.env.NODE_ENV === "development" ? 3001 : 3000);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
