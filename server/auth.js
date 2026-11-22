import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AUTH_COOKIE = 'downbot_session';
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export function createAuthService({ db, jwtSecret }) {
  const findUserByEmail = db.prepare('SELECT * FROM users WHERE email = ?');
  const findUserById = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?');
  const insertUser = db.prepare(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
  );

  return {
    async register({ name, email, password }) {
      const normalizedEmail = email.trim().toLowerCase();
      if (findUserByEmail.get(normalizedEmail)) {
        const error = new Error('An account with this email already exists.');
        error.status = 409;
        throw error;
      }

      const passwordHash = await bcrypt.hash(password, 12);
      let result;
      try {
        result = insertUser.run(name.trim(), normalizedEmail, passwordHash);
      } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.message.includes('UNIQUE constraint failed')) {
          const duplicateError = new Error('An account with this email already exists.');
          duplicateError.status = 409;
          throw duplicateError;
        }
        throw error;
      }
      return findUserById.get(result.lastInsertRowid);
    },

    async login({ email, password }) {
      const user = findUserByEmail.get(email.trim().toLowerCase());
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        const error = new Error('Email or password is incorrect.');
        error.status = 401;
        throw error;
      }
      return findUserById.get(user.id);
    },

    findById(id) {
      return findUserById.get(id);
    },

    createToken(user) {
      return jwt.sign({ sub: String(user.id) }, jwtSecret, { expiresIn: '7d' });
    },

    verifyToken(token) {
      const payload = jwt.verify(token, jwtSecret);
      const id = Number(payload.sub);
      return Number.isSafeInteger(id) ? id : null;
    },
  };
}

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.created_at,
  };
}
