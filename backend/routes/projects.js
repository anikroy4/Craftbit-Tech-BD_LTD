import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// GET /api/projects — list all (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/projects/:id — single project by slug or mongo id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }]
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/projects — create new project (editor, admin, superadmin)
router.post('/', async (req, res) => {
  try {
    const { title, category, desc, tech, client, stats, image, iconKey } = req.body;
    if (!title || !desc || !category) {
      return res.status(400).json({ success: false, message: 'Title, category, and description are required' });
    }
    const slug = req.body.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const project = await Project.create({
      id: slug + '-' + Date.now().toString().slice(-4),
      title,
      category,
      desc,
      tech: Array.isArray(tech) ? tech : (tech ? tech.split(',').map(t => t.trim()) : ['React', 'Node.js']),
      client: client || 'Craftbit Client',
      stats: stats || '99.9% Uptime',
      iconKey: iconKey || 'web',
      image: image || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/projects/:id — update project (editor, admin, superadmin)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }] },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/projects/:id — delete project (admin, superadmin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }]
    });
    if (!deleted) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
