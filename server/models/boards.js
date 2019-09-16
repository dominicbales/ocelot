const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    boardName: {
      type: String
    },
    description: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
    lanes: { type: Array }
  },
  {
    timestamps: true
  }
);

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
