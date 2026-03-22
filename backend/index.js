const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Compliance Tracker API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/clients", (req, res) => {
  db.all("SELECT * FROM clients", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});