import { Router } from 'express';
import {
  AUTH_COOKIE,
  SESSION_MAX_AGE,
  publicUser,
} from '../auth.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cookieOptions = (isProduction) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
  maxAge: SESSION_MAX_AGE,
});
const clearCookieOptions = (isProduction) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
});

function validateCredentials({ name, email, password }, includeName) {
  if (includeName && (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80)) {
    return 'Name must be between 2 and 80 characters.';
  }
  if (typeof email !== 'string' || email.length > 254 || !emailPattern.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
    return 'Password must be between 8 and 72 characters.';
  }
  return null;
}

export function createAuthRouter({ auth, isProduction }) {
  const router = Router();

  router.post('/register', async (req, res, next) => {
    const validationError = validateCredentials(req.body ?? {}, true);
    if (validationError) return res.status(400).json({ message: validationError });

    try {
      const user = await auth.register(req.body);
      res.cookie(AUTH_COOKIE, auth.createToken(user), cookieOptions(isProduction));
      return res.status(201).json({ user: publicUser(user) });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/login', async (req, res, next) => {
    const validationError = validateCredentials(req.body ?? {}, false);
    if (validationError) return res.status(400).json({ message: validationError });

    try {
      const user = await auth.login(req.body);
      res.cookie(AUTH_COOKIE, auth.createToken(user), cookieOptions(isProduction));
      return res.json({ user: publicUser(user) });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE, clearCookieOptions(isProduction));
    res.status(204).end();
  });

  router.get('/me', (req, res) => {
    const token = req.cookies[AUTH_COOKIE];
    if (!token) return res.status(401).json({ message: 'You are not signed in.' });

    try {
      const userId = auth.verifyToken(token);
      const user = userId ? auth.findById(userId) : null;
      if (!user) {
        res.clearCookie(AUTH_COOKIE, clearCookieOptions(isProduction));
        return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
      }
      return res.json({ user: publicUser(user) });
    } catch {
      res.clearCookie(AUTH_COOKIE, clearCookieOptions(isProduction));
      return res.status(401).json({ message: 'Your session has expired. Please sign in again.' });
    }
  });

  return router;
}
