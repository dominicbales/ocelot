const express = require("express");
const router = express.Router();

const boardController = require("../../controllers/boardController");

//@route    GET /api/boards/project/:projectId
//@desc     fetches boards for project
//@access   private
router.get("/project/:projectId", boardController.fetchBoardByProjectID);

//@route    POST /api/boards/project/:projectId/:userId
//@desc     Create board
//@access   private
router.post("/project/:projectId/:userId", boardController.createBoard);

//@route    GET /api/boards/:boardId/lanes
//@desc     get board data
//@access   private
router.get("/:boardId/lanes", boardController.getBoardData);

//@route    POST /api/boards/:boardId
//@desc     add data to board lanes,
//@access   private
router.post("/:boardId", boardController.addToBoardLanes);

module.exports = router;
