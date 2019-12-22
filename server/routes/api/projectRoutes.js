const express = require("express");
const router = express.Router();
const passport = require("passport");

const projectController = require("../../controllers/projectController");

//@route    POST /api/projects/:id
//@desc     create project
//@access   private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectController.createBoard
);

//@route    GET /api/projects/:id
//@desc     fetches users projects by ownership
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectController.fetchUserProjectByOwner
);

//@route    GET /api/projects/by/user/:id
//@desc     fetches users projects by user projects array
//@access   private
router.get(
  "/by/user/:id",
  passport.authenticate("jwt", { session: false }),
  projectController.fetchUserProjectsByArray
);

//@route    GET /api/project/:id
//@desc     fetches users project
//@access   private
router.get(
  "/project/:id",
  passport.authenticate("jwt", { session: false }),
  projectController.fetchUserProjectByID
);

module.exports = router;
