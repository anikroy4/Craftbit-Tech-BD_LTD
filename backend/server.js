import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import serviceRoutes from './routes/services.js';
import projectRoutes from './routes/projects.js';
import quoteRoutes from './routes/quotes.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes, { ensureDefaultAccounts } from './routes/auth.js';

// Connect to MongoDB
connectDB().then(() => {
  ensureDefaultAccounts().catch(console.error);
});

const app = express();

// ── Middleware ──────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ── Health Check ────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'CraftBit API is running 🚀' });
});

// ── 404 Handler ─────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler ────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start Server ────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
