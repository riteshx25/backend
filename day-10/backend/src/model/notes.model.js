const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  },
);

const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
