import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// GET /api/services — list all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/services/:id — single service by id or slug
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }]
    });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/services — create new service (editor, admin, superadmin)
router.post('/', async (req, res) => {
  try {
    const { title, desc, iconKey, category, baseCost, typicalDuration, features, image } = req.body;
    if (!title || !desc || !category) {
      return res.status(400).json({ success: false, message: 'Title, description, and category are required' });
    }
    const slug = req.body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const service = await Service.create({
      id: slug + '-' + Date.now().toString().slice(-4),
      title,
      desc,
      iconKey: iconKey || 'web',
      category,
      baseCost: Number(baseCost) || 1500,
      typicalDuration: typicalDuration || '2 - 4 Weeks',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
      image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    });
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/services/:id — update service (editor, admin, superadmin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Service.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }] },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/services/:id — delete service (admin, superadmin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Service.findOneAndDelete({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }]
    });
    if (!deleted) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
