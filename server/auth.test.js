import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import request from 'supertest';
import { createApp } from './app.js';
import { createDatabase } from './db.js';

let db;
let app;

beforeEach(async () => {
  db = await createDatabase(':memory:');
  ({ app } = createApp({ db, jwtSecret: 'test-secret-with-more-than-thirty-two-characters' }));
});

afterEach(() => db.close());

test('registers a user, persists the session cookie, and returns the signed-in user', async () => {
  const agent = request.agent(app);
  const registration = await agent
    .post('/api/auth/register')
    .send({ name: 'Taylor Morgan', email: 'Taylor@example.com', password: 'a-secure-password' });

  assert.equal(registration.status, 201);
  assert.equal(registration.body.user.email, 'taylor@example.com');
  assert.ok(registration.headers['set-cookie'][0].includes('HttpOnly'));
  assert.equal('password_hash' in registration.body.user, false);

  const session = await agent.get('/api/auth/me');
  assert.equal(session.status, 200);
  assert.equal(session.body.user.name, 'Taylor Morgan');
});

test('rejects duplicate accounts, invalid input, and incorrect passwords', async () => {
  const agent = request.agent(app);
  const user = { name: 'Taylor Morgan', email: 'taylor@example.com', password: 'a-secure-password' };

  assert.equal((await agent.post('/api/auth/register').send(user)).status, 201);
  assert.equal((await agent.post('/api/auth/register').send(user)).status, 409);
  assert.equal(
    (await request(app).post('/api/auth/register').send({ ...user, password: 'short' })).status,
    400,
  );
  assert.equal(
    (await request(app).post('/api/auth/login').send({ ...user, password: 'incorrect-password' })).status,
    401,
  );
});

test('logout clears the session and prevents subsequent access to the current user', async () => {
  const agent = request.agent(app);
  await agent.post('/api/auth/register').send({
    name: 'Taylor Morgan',
    email: 'taylor@example.com',
    password: 'a-secure-password',
  });

  assert.equal((await agent.post('/api/auth/logout')).status, 204);
  assert.equal((await agent.get('/api/auth/me')).status, 401);
});
