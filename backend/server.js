import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
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
  'https://craftbit-tech-bd-ltd.onrender.com'
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
  res.json({ success: true, message: 'CraftBit API is running 🚀', timestamp: new Date().toISOString() });
});

// ── Serve Frontend Production Build ─────────────────
const possibleDistPaths = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, '../frontend/dist'),
];
const frontendDistPath = possibleDistPaths.find((p) => fs.existsSync(p));

if (frontendDistPath) {
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    const indexPath = path.join(frontendDistPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    next();
  });
} else {
  app.get('/', (_req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CraftBit Tech BD LTD</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #090e1a; color: #f8fafc; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 80vh; text-align: center; }
            .box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 36px 28px; max-width: 480px; }
            h1 { color: #38bdf8; margin: 0 0 10px; font-size: 24px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 20px; }
            a { display: inline-block; background: #0284c7; color: #fff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>CraftBit Tech BD LTD 🚀</h1>
            <p>API Server is live and connected to MongoDB Atlas.</p>
            <a href="/api/health">Check API Health Status</a>
          </div>
        </body>
      </html>
    `);
  });
}

// ── 404 Handler for Unmatched API routes ────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' });
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
