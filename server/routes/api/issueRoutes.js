const express = require("express");
const router = express.Router();
const passport = require("passport");

const issueController = require("../../controllers/issueController");

//@route    POST /api/issues/reply/:id
//@desc     creates a reply
//@access   private
router.post(
  "/reply/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.createReply
);

//@route    POST /api/issues/comment/:id
//@desc     creates issue comment
//@access   private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.createIssueComment
);

//@route    GET /api/issues/comment/:id
//@desc     gets issue comments
//@access   private
router.get(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.fetchIssueComments
);

//@route    POST /api/issues/:id
//@desc     creates issue
//@access   private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.createIssue
);

//@route    POST /api/issues/:id/active
//@desc     updates active for issues
//@access   private
router.post(
  "/:id/active",
  passport.authenticate("jwt", { session: false }),
  issueController.setIssueActive
);

//@route    GET /api/issues/:id
//@desc     fetches issues
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.fetchIssues
);

//@route    GET /api/issues/issue/:id
//@desc     fetches issue based on id
//@access   private
router.get(
  "/issue/:id",
  passport.authenticate("jwt", { session: false }),
  issueController.fetchIssueByID
);

module.exports = router;
