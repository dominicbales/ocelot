const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const { User, Project, Issue, IssueComment } = require("../../models/index");

//@route    POST /api/issues/reply/:id
//@desc     creates a reply
//@access   private
router.post(
  "/reply/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a issue
      console.log("req body:", req.body);
      console.log("params:", req.params.id);
      let issueComment = await IssueComment.findOne({ _id: req.params.id });
      if (issueComment) {
        const newReply = {
          reply: req.body.reply,
          authorId: req.body.userId,
          author: req.body.author
        };
        issueComment.replies.push(newReply);
        issueComment.save();
        res.status(200).send("good");
      }
    } catch (err) {
      return next({ status: 400, message: "Cant post issues comments" });
    }
  }
);

//@route    POST /api/issues/comment/:id
//@desc     creates issue
//@access   private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a issue
      let issue = await Issue.findOne({ _id: req.params.id });
      if (issue) {
        const newIssueComment = new IssueComment({
          comment: req.body.comment,
          ownerId: req.body.userId,
          ownerName: req.body.ownerName
        });
        issue.issueComments.push(newIssueComment._id);
        issue.save();
        newIssueComment.save().then(issue => res.json(issue));
      }
    } catch (err) {
      return next({ status: 400, message: "Cant post issues comments" });
    }
  }
);

//@route    GET /api/issues/comment/:id
//@desc     gets issue comments
//@access   private
router.get(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a issue
      let issue = await Issue.findOne({ _id: req.params.id }, function(
        err,
        issue
      ) {
        if (err) {
          console.log("error fetch issue inside server");
        }
      });
      let commentIds = issue.issueComments.map(item => {
        return;
      });
      if (issue) {
        IssueComment.find({ _id: { $in: issue.issueComments } }, function(
          err,
          data
        ) {
          res.status(200).json(data);
        });
      }
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

//@route    POST /api/issues/:id
//@desc     creates issue
//@access   private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a user
      let project = await Project.findOne({ _id: req.params.id });
      if (project) {
        const newIssue = new Issue({
          issueName: req.body.name,
          description: req.body.description,
          ownerId: req.body.userId,
          ownerName: req.body.userName,
          active: req.body.active,
          projectId: req.params.id
        });
        project.issues.push(newIssue._id);
        project.save();
        newIssue.save().then(issue => res.json(issue));
      }
    } catch (err) {
      return next({ status: 400, message: "Cant post issues" });
    }
  }
);

//@route    POST /api/issues/:id/active
//@desc     updates active for issues
//@access   private
router.post(
  "/:id/active",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a user
      let issue = await Issue.findOne({ _id: req.params.id });
      if (issue) {
        issue.active = req.body.active;
        issue.save();
        res.json(issue);
      }
    } catch (err) {
      return next({ status: 400, message: "Cant post issues" });
    }
  }
);

//@route    GET /api/issues/:id
//@desc     fetches issues
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { page } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: 10,
        collation: {
          locale: "en"
        }
      };

      const issuePaginate = Issue.paginate(
        { projectId: req.params.id },
        options,
        function(err, result) {
          if (err) {
            console.log("issue pagin error:", err);
          } else {
            res.json(result);
          }
        }
      );
    } catch (err) {
      return next({ status: 400, message: "Cant find issues" });
    }
  }
);

//@route    GET /api/issues/issue/:id
//@desc     fetches users project
//@access   private
router.get(
  "/issue/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a issue
      let issue = await Issue.findOne({ _id: req.params.id }, function(
        err,
        issue
      ) {
        if (err) {
          console.log("error fetch project inside server");
        }
      });
      if (issue) {
        res.json(issue);
      }
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

module.exports = router;
