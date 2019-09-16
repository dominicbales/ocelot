const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { User, Project, Board } = require("../../models/index");

//@route    GET /api/boards/project/:projectId
//@desc     fetches boards for project
//@access   private
router.get("/project/:projectId", async (req, res) => {
  try {
    let boards = await Board.find({ projectId: req.params.projectId });
    if (boards) {
      res.json(boards);
    }
  } catch (err) {
    console.log("ERROR: fetching project boards");
  }
});

//@route    POST /api/boards/project/:projectId/:userId
//@desc     Create board
//@access   private
router.post("/project/:projectId/:userId", async (req, res) => {
  console.log("data:", req.body.boardName);
  const { boardName, description } = req.body;
  try {
    let project = await Project.findOne({ _id: req.params.projectId });
    console.log("project:", project);
    const newBoard = new Board({
      boardName: boardName,
      description: description,
      lanes: [],
      projectId: req.params.projectId
    });
    project.boards.push(newBoard._id);
    project.save();
    newBoard.save().then(board => res.json(board));
    console.log("boards are:", newBoard);
  } catch (err) {
    console.log("ERROR: adding new board:", err);
  }
});

//@route    GET /api/boards/:boardId/lanes
//@desc     get board data
//@access   private
router.get("/:boardId/lanes", async (req, res) => {
  console.log("inside get");
  try {
    let board = await Board.findOne({ _id: req.params.boardId });
    if (board) {
      console.log("found:", board);
      res.json(board);
    }
  } catch (err) {
    console.log("ERROR: adding new lanes:", err);
  }
});

//@route    POST /api/boards/:boardId
//@desc     add data to board lanes,
//@access   private
router.post("/:boardId", async (req, res) => {
  // console.log("board params:", req.params.boardId);
  console.log("inside post");
  const { lanes } = req.body;
  try {
    let board = await Board.findOne({ _id: req.params.boardId });
    // console.log("lanes:", lanes);
    // console.log("board 1:", board);
    board.lanes = [...lanes];
    board.save();
    console.log("***************END***************");
    // console.log("boards are:", board);
  } catch (err) {
    console.log("ERROR: adding new lanes:", err);
  }
});

module.exports = router;
