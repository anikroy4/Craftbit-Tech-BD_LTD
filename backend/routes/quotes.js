import express from 'express';
import QuoteRequest from '../models/QuoteRequest.js';
import { 
  sendQuoteConfirmationEmail, 
  sendAdminLeadAlert, 
  sendDirectReplyEmail 
} from '../utils/mailer.js';

const router = express.Router();

// POST /api/quotes — submit a new quote request
router.post('/', async (req, res) => {
  try {
    const { name, email, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const quote = await QuoteRequest.create({ name, email, service, budget, message });

    // Send confirmation to client via Nodemailer
    sendQuoteConfirmationEmail({
      to: email,
      name,
      service,
      budget,
      message,
    }).catch((e) => console.warn('Quote client mailer warning:', e.message));

    // Send lead notification to CraftBit team
    sendAdminLeadAlert({
      clientName: name,
      clientEmail: email,
      service,
      budget,
      message,
    }).catch((e) => console.warn('Admin lead mailer warning:', e.message));

    res.status(201).json({ success: true, data: quote });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/quotes — list all quote requests (admin, superadmin, moderator)
router.get('/', async (req, res) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/quotes/:id/status — update status ('new' | 'reviewed' | 'replied' | 'closed')
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'reviewed', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const updated = await QuoteRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/quotes/:id/reply — direct email reply via Nodemailer
router.post('/:id/reply', async (req, res) => {
  try {
    const { replyMessage, subject, adminName } = req.body;
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });

    if (!replyMessage) {
      return res.status(400).json({ success: false, message: 'Reply message is required' });
    }

    const mailResult = await sendDirectReplyEmail({
      to: quote.email,
      clientName: quote.name,
      subject,
      replyMessage,
      adminName: adminName || 'CraftBit Team',
    });

    quote.status = 'replied';
    await quote.save();

    res.json({
      success: true,
      message: `Email reply dispatched to ${quote.email} via Nodemailer`,
      data: quote,
      mailResult,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/quotes/:id — delete quote (admin, superadmin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
