const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const TeamMember = require('../models/TeamMember');
const { services, projects, testimonials, team } = require('../seed/seedData');

// POST /api/seed — drops and repopulates all collections
router.post('/', async (req, res) => {
  try {
    await Service.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await TeamMember.deleteMany({});

    await Service.insertMany(services);
    await Project.insertMany(projects);
    await Testimonial.insertMany(testimonials);
    await TeamMember.insertMany(team);

    res.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
