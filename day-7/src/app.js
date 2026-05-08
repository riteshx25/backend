const express = require("express");

const app = express();

const noteModel = require("./models/notes.model");

app.use(express.json());

// Create note
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// Fetch note
app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json(notes);
});

module.exports = app;
