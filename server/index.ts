import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

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
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpUser || !smtpPass) {
        console.error("SMTP credentials not configured. SMTP_USER:", !!smtpUser, "SMTP_PASS:", !!smtpPass);
        return res.status(500).json({ 
          error: "Email service not configured. Please check server environment variables." 
        });
      }

      // Create transporter with Gmail-optimized settings
      // Gmail works best with port 465 (SSL) on cloud platforms
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        // Increased timeouts for cloud platforms
        connectionTimeout: 60000, // 60 seconds
        greetingTimeout: 30000, // 30 seconds
        socketTimeout: 60000, // 60 seconds
        // Gmail-specific TLS settings
        tls: {
          rejectUnauthorized: false,
          minVersion: 'TLSv1.2',
          ciphers: 'SSLv3'
        },
        // Disable pooling for Gmail on cloud platforms
        pool: false,
        // Gmail rate limiting
        rateLimit: 14, // Gmail allows 14 emails per second
        rateDelta: 1000
      });

      // Skip verification in production (can timeout on cloud platforms)
      // We'll verify during actual send instead
      if (process.env.NODE_ENV === "development") {
        try {
          await transporter.verify();
          console.log("SMTP server is ready to send emails");
        } catch (verifyError) {
          console.error("SMTP verification failed:", verifyError);
          // Don't fail here, try sending anyway
        }
      } else {
        console.log("Skipping SMTP verification in production (will verify during send)");
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
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);

      res.json({ success: true, message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      const errorMessage = error?.message || "Failed to send email";
      console.error("Error details:", {
        code: error?.code,
        command: error?.command,
        response: error?.response,
      });
      res.status(500).json({ 
        error: "Failed to send email",
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

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
