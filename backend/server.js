import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ── Load Environment Variables ──────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to current working directory

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

// ── Allowed CORS Origins ─────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5000',
  'http://localhost:3000',
];

if (process.env.CLIENT_URL) {
  const cleanClientUrl = process.env.CLIENT_URL.replace(/\/+$/, '');
  allowedOrigins.push(cleanClientUrl);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isExplicitlyAllowed = allowedOrigins.includes(origin);
      const isVercelDomain = /\.vercel\.app$/.test(origin);
      const isOnRenderDomain = /\.onrender\.com$/.test(origin);

      if (isExplicitlyAllowed || isVercelDomain || isOnRenderDomain) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev/production to prevent CORS roadblocks
    },
    credentials: true,
  })
);

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
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
      if (port === 5000) {
        console.warn(`⚠️ Port 5000 is occupied or restricted on this machine. Falling back to port 5001...`);
        startServer(5001);
      } else {
        console.error(`❌ Port ${port} is currently in use or restricted:`, err.message);
      }
    } else {
      console.error('❌ Server startup error:', err);
    }
  });
};

startServer(DEFAULT_PORT);
