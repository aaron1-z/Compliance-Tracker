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
  
  db.run(`
    INSERT OR IGNORE INTO clients VALUES
    ("1", "Tata Pvt Ltd", "India", "Private Limited"),
    ("2", "Infosys Ltd", "India", "Public Limited")
  `);
});

module.exports = db;