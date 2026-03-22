const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      company_name TEXT,
      country TEXT,
      entity_type TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      client_id TEXT,
      title TEXT,
      description TEXT,
      category TEXT,
      due_date TEXT,
      status TEXT,
      priority TEXT
    )
  `);
});

module.exports = db;