const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Create transporter using environment variables
    // Configure transporter with environment variables for Gmail or custom SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send mail
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    return res.json({ success: true, message: 'Your message has been sent.' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({ success: false, message: 'Error sending message.' });
  }
});

module.exports = router;
