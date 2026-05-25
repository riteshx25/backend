const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public/dist")));

const noteModel = require("./model/notes.model");

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await noteModel.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// =========================
// get note
// =========================

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// =========================
// delete note
// =========================

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await noteModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      deletedNote,
    });
  } catch (error) {
    console.error(error.message);
  }
});

// =========================
// update note
// =========================

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});

module.exports = app;
