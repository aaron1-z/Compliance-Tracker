const express = require("express");
const cors = require("cors");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Compliance Tracker API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/clients", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.get("/tasks/:clientId", (req, res) => {
  db.all(
    "SELECT * FROM tasks WHERE client_id=?",
    [req.params.clientId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

app.post("/tasks", (req, res) => {
  const {
    client_id,
    title,
    description,
    category,
    due_date,
    status,
    priority
  } = req.body;

  const id = uuidv4();

  db.run(
    `INSERT INTO tasks VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, client_id, title, description, category, due_date, status, priority],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created" });
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  db.run(
    "UPDATE tasks SET status=? WHERE id=?",
    [req.body.status, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status updated" });
    }
  );
});