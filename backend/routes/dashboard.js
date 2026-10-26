import express from 'express';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import QuoteRequest from '../models/QuoteRequest.js';
import User from '../models/User.js';
import { sendVerificationOTPEmail } from '../utils/mailer.js';

const router = express.Router();

// GET /api/dashboard/overview — aggregate real database metrics
router.get('/overview', async (req, res) => {
  try {
    const [servicesCount, projectsCount, quotesCount, usersCount, recentQuotes, quotesByStatus] =
      await Promise.all([
        Service.countDocuments(),
        Project.countDocuments(),
        QuoteRequest.countDocuments(),
        User.countDocuments(),
        QuoteRequest.find().sort({ createdAt: -1 }).limit(5),
        QuoteRequest.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } }
        ]),
      ]);

    const statusMap = { new: 0, reviewed: 0, replied: 0, closed: 0 };
    quotesByStatus.forEach((item) => {
      if (item._id) statusMap[item._id] = item.count;
    });

    res.json({
      success: true,
      data: {
        counts: {
          services: servicesCount,
          projects: projectsCount,
          quotes: quotesCount,
          users: usersCount,
        },
        quotesStatus: statusMap,
        recentQuotes,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Helper to retrieve acting caller's role
const getActingRole = (req) => {
  return (req.headers['x-acting-role'] || req.body?.actingRole || 'moderator').toLowerCase();
};

// GET /api/dashboard/users — list users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/dashboard/users — create a new user (Only SuperAdmin)
router.post('/users', async (req, res) => {
  try {
    const actingRole = getActingRole(req);
    if (actingRole !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Only SuperAdmin has access to create new team accounts and assign Admin or Moderator roles.'
      });
    }

    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    const cleanEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // Generate 6-digit OTP code for user to verify email upon first login
    const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours for invited user

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      role: role || 'moderator',
      isEmailVerified: false,
      verificationCode: verificationOtp,
      verificationCodeExpires: otpExpires,
      status: 'active'
    });

    // Send verification email to invited user
    sendVerificationOTPEmail({
      to: newUser.email,
      name: newUser.name,
      code: verificationOtp
    }).catch((e) => console.warn('Invite verification mailer warning:', e.message));

    res.status(201).json({
      success: true,
      message: `User created. Verification code dispatched to ${newUser.email}.`,
      data: newUser,
      previewCode: verificationOtp
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/dashboard/users/:id/role — change user role
// SuperAdmin: Full access to assign superadmin, admin, or moderator
// Admin: Can promote Moderator to Admin (cannot grant SuperAdmin, cannot edit SuperAdmin)
// Moderator: No role management permission
// MUST ENFORCE: User MUST verify their email before SuperAdmin can assign roles or promote!
router.patch('/users/:id/role', async (req, res) => {
  try {
    const actingRole = getActingRole(req);
    const { role } = req.body;

    if (!['superadmin', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid target role specified' });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // ENFORCE: User must have verified their email first
    if (!targetUser.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: `Action Blocked: ${targetUser.name} (${targetUser.email}) has not verified their email yet. Email verification is mandatory before SuperAdmin or Admin can assign or promote roles.`
      });
    }

    // 1. Moderators cannot modify any roles
    if (actingRole === 'moderator') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Moderators do not have permission to modify team roles.'
      });
    }

    // 2. Admins can promote Moderator to Admin, but cannot make SuperAdmin or touch SuperAdmin
    if (actingRole === 'admin') {
      if (targetUser.role === 'superadmin') {
        return res.status(403).json({
          success: false,
          message: 'Access Denied: Admins cannot modify SuperAdmin accounts.'
        });
      }
      if (role === 'superadmin') {
        return res.status(403).json({
          success: false,
          message: 'Access Denied: Only SuperAdmin has the authority to grant the SuperAdmin role.'
        });
      }
      // Admin is giving moderator to admin (or adjusting non-superadmin roles)
    }

    // 3. SuperAdmin has unrestricted access
    targetUser.role = role;
    await targetUser.save();
    res.json({ success: true, data: targetUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/dashboard/users/:id/resend-verification — SuperAdmin triggers resending verification code
router.post('/users/:id/resend-verification', async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (targetUser.isEmailVerified) {
      return res.json({
        success: true,
        message: `${targetUser.name}'s email is already verified.`,
        data: targetUser
      });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    targetUser.verificationCode = newOtp;
    targetUser.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await targetUser.save();

    await sendVerificationOTPEmail({
      to: targetUser.email,
      name: targetUser.name,
      code: newOtp
    });

    res.json({
      success: true,
      message: `Fresh verification code sent to ${targetUser.email} via Nodemailer.`,
      previewCode: newOtp
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// DELETE /api/dashboard/users/:id — delete user (Only SuperAdmin)
router.delete('/users/:id', async (req, res) => {
  try {
    const actingRole = getActingRole(req);
    if (actingRole !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Only SuperAdmin has access to permanently delete team member accounts.'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

