const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
// const keys = require('../../config/keys');
const passport = require("passport");

const { User, Project } = require("../../models/index");

//@route    POST /api/projects/:id
//@desc     create project
//@access   private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding a user
      let user = await User.findOne({ _id: req.params.id });
      if (user) {
        // generate random number so project icon will be different
        // when created
        let randomNum = Math.floor(Math.random() * 50);
        const avatar = gravatar.url(user._id + randomNum, {
          protocol: "https",
          d: "identicon" //Default
        });
        const newProject = new Project({
          name: req.body.name,
          privacy: req.body.privacy,
          owner: req.params.id,
          projectImg: avatar
        });
        user.projects.push(newProject._id);
        user.save();
        newProject.save().then(project => res.json(project));
      }
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

//@route    GET /api/projects/:id
//@desc     fetches users projects by ownership
//@access   private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      //finding project
      let projects = await Project.find({ owner: req.params.id }, function(
        err,
        project
      ) {});
      if (projects) {
        res.json(projects);
      }
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

//@route    GET /api/projects/by/user/:id
//@desc     fetches users projects by user projects array
//@access   private
router.get(
  "/by/user/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      // Find user
      let user = await User.findOne({ _id: req.params.id });
      let projectsArray = [];
      let projectHolder = {};

      // find projects that are stored in user projects array
      for (let i = 0; i < user.projects.length; i++) {
        projectHolder = await Project.findOne({ _id: user.projects[i] });
        projectsArray.push(projectHolder);
      }
      res.json(projectsArray);
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

//@route    GET /api/project/:id
//@desc     fetches users project
//@access   private
router.get(
  "/project/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log("fetch Project ID:", req.params.id);
    try {
      //finding project
      let projects = await Project.findOne({ _id: req.params.id }, function(
        err,
        project
      ) {
        if (err) {
          console.log("error fetch project inside server");
        }
      });
      if (projects) {
        res.json(projects);
      }
      // console.log("projects is: ", projects);
    } catch (err) {
      return next({ status: 400, message: "Cant find projects" });
    }
  }
);

module.exports = router;
