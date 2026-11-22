import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET;

if (isProduction && (!jwtSecret || jwtSecret.length < 32)) {
  throw new Error('JWT_SECRET must be set to at least 32 characters in production.');
}

export const config = {
  port: Number(process.env.PORT) || 3001,
  jwtSecret: jwtSecret || 'local-development-secret-change-before-deploying',
  databasePath: process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.resolve('data/downbot.sqlite'),
  isProduction,
};
