const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');

// Create transporter
const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

// Validation rules
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10 }),
];

// POST /api/contact
router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    // 1. Save to DB
    const contact = await ContactMessage.create({
      name, email, phone, subject, message,
      ipAddress: req.ip,
    });

    // 2. Send email notification (non-blocking)
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"CraftBit Tech BD Website" <${process.env.SMTP_USER}>`,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `[Contact] ${subject} – from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#0073E6">New Contact Message – CraftBit Tech BD</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || 'N/A'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#f4f8ff;border-radius:8px">
              <p style="margin:0">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color:#999;font-size:12px;margin-top:24px">Sent from CraftBit Tech BD Website Contact Form</p>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"CraftBit Tech BD" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thank you for contacting CraftBit Tech BD, ${name}!`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#0073E6">Thank you, ${name}!</h2>
            <p>We have received your message and will get back to you within <strong>24 hours</strong>.</p>
            <p>Here's a copy of your message:</p>
            <div style="padding:16px;background:#f4f8ff;border-radius:8px;border-left:4px solid #0073E6">
              <p><strong>Subject:</strong> ${subject}</p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="margin-top:24px">Regards,<br><strong>CraftBit Tech BD Team</strong><br>Smart • Simple • Scalable</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error('Email send error (non-fatal):', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
      data: { id: contact._id },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
