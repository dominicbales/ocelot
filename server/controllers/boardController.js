const catchAsync = require("../utils/catchAsync");

const { Project, Board } = require("../models/index");

exports.fetchBoardByProjectID = catchAsync(async (req, res, next) => {
  try {
    let boards = await Board.find({ projectId: req.params.projectId });
    if (boards) {
      res.json(boards);
    }
  } catch (err) {
    console.log("ERROR: fetching project boards");
  }
});

exports.createBoard = catchAsync(async (req, res, next) => {
  const { boardName, description } = req.body;
  try {
    let project = await Project.findOne({ _id: req.params.projectId });
    const newBoard = new Board({
      boardName: boardName,
      description: description,
      lanes: [],
      projectId: req.params.projectId
    });
    project.boards.push(newBoard._id);
    project.save();
    newBoard.save().then(board => res.json(board));
  } catch (err) {
    console.log("ERROR: adding new board:", err);
  }
});

exports.getBoardData = catchAsync(async (req, res, next) => {
  try {
    let board = await Board.findOne({ _id: req.params.boardId });
    if (board) {
      res.json(board);
    }
  } catch (err) {
    console.log("ERROR: adding new lanes:", err);
  }
});

exports.addToBoardLanes = catchAsync(async (req, res) => {
  const { lanes } = req.body;
  try {
    let board = await Board.findOne({ _id: req.params.boardId });
    board.lanes = [...lanes];
    board.save();
  } catch (err) {
    console.log("ERROR: adding new lanes:", err);
  }
});
