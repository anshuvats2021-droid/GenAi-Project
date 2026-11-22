import fs from 'node:fs';
import path from 'node:path';
import initSqlJs from 'sql.js';

export async function createDatabase(databasePath) {
  if (databasePath !== ':memory:') {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  }

  const SQL = await initSqlJs();
  const db = databasePath !== ':memory:' && fs.existsSync(databasePath)
    ? new SQL.Database(fs.readFileSync(databasePath))
    : new SQL.Database();
  const persist = () => {
    if (databasePath !== ':memory:') {
      fs.writeFileSync(databasePath, Buffer.from(db.export()));
    }
  };

  db.run('PRAGMA foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  persist();

  return {
    prepare(sql) {
      return {
        get(...params) {
          const statement = db.prepare(sql);
          try {
            statement.bind(params);
            return statement.step() ? statement.getAsObject() : undefined;
          } finally {
            statement.free();
          }
        },
        run(...params) {
          db.run(sql, params);
          const result = db.exec('SELECT last_insert_rowid() AS id');
          const lastInsertRowid = result[0]?.values[0]?.[0] ?? 0;
          persist();
          return { lastInsertRowid };
        },
      };
    },
    close() {
      persist();
      db.close();
    },
  };
}
