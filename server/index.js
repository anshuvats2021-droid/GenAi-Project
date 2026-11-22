import { config } from './config.js';
import { createDatabase } from './db.js';
import { createApp } from './app.js';

const db = await createDatabase(config.databasePath);
const { app } = createApp({ db, jwtSecret: config.jwtSecret, isProduction: config.isProduction });

const server = app.listen(config.port, () => {
  console.log(`Downbot API listening on http://localhost:${config.port}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
