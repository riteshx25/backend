const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("note deleted");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].title = req.body.title;
  res.send("note updated");
});

module.exports = app;
