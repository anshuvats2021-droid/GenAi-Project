import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createAuthService } from './auth.js';
import { createAuthRouter } from './routes/authRoutes.js';

export function createApp({
  db,
  jwtSecret = process.env.JWT_SECRET || 'local-development-secret-change-before-deploying',
  isProduction = process.env.NODE_ENV === 'production',
} = {}) {
  if (!db) throw new Error('A database instance is required.');

  const app = express();
  const auth = createAuthService({ db, jwtSecret });

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));
  app.use(cookieParser());
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', createAuthRouter({ auth, isProduction }));
  app.use((error, _req, res, _next) => {
    if (error.status) return res.status(error.status).json({ message: error.message });
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  });

  return { app, db };
}
