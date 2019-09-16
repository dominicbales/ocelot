const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
const passport = require("passport");
// Middleware
const { loginRequired } = require("../../middleware/auth");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const { User, Project } = require("../../models/index");

//@route    GET /api/user/test
//@desc     test users routes
//@access   public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route    GET /api/user/search/:name
//@desc     search for user by name
//@access   public
router.get("/search/:name", async (req, res) => {
  let user = await User.find({
    username: { $regex: "^" + req.params.name }
  });
  const filterArray = user.map(val => {
    let { email, username, _id } = val;
    return { email, username, _id };
  });
  return res.status(200).json(filterArray);
});

//@route    GET /api/user/register
//@desc     register users
//@access   public
router.post("/register", async (req, res, next) => {
  try {
    //create a user
    let user = await User.create(req.body);
    const avatar = gravatar.url(req.body.email, {
      d: "mp" //Default
    });
    user.profileImageUrl = avatar;
    user.save();
    let { _id, username, profileImageUrl } = user;
    //create a token (signing a token)
    let token = jwt.sign(
      {
        _id,
        username
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      _id,
      username,
      token
    });
  } catch (err) {
    //see what kind of error
    //if it is a certain error
    //respond with username/email already taken
    //otherwise just send back a generic 400

    //if a validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
});

//@route    GET /api/user/login
//@desc     login User / Returning JWT Token
//@access   public
router.post("/login", async (req, res, next) => {
  try {
    //finding a user
    let user = await User.findOne({
      email: req.body.email
    });
    let { _id, username, projects, email, password, profileImageUrl } = user;
    //checking if their password matches what was sent to the server]
    let isMatch = await user.comparePassword(req.body.password);
    //if it all matches
    if (isMatch) {
      let token = jwt.sign(
        {
          _id,
          username,
          projects,
          email,
          password,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      // send a cookie with jwt token
      // res.cookie('jwt',token);
      return res.status(200).json({
        success: true,
        message: "Authentication successful!",
        token
      });
    } else {
      return next({
        success: false,
        status: 400,
        message: "Invalid if/else error Email/Password"
      });
    }
  } catch (err) {
    return next({ status: 400, message: "CATCH: Invalid Email/Password" });
  }
});

//@route    GET /api/user/current
//@desc     Return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Success passport" });
  }
);

//@route    POST /api/user/invite/:projectId/user/:userId
//@desc     invite user to project
//@access   public
router.post("/invite/:projectId/user/:userId", async (req, res) => {
  // Loop through array of users to send invites to
  for (let k = 0; k < req.body.invitedUsers.length; k++) {
    let user = await User.findOne({
      email: req.body.invitedUsers[k].email
    });

    if (user) {
      // Check if user is already in project list
      for (let i = 0; i < user.projects.length; i++) {
        if (user.projects[i] == req.params.projectId) {
          return res.json({
            msg: `User: ${user.username} is already in this project`
          });
        }
      }
      // Check if user has already been invited to the project
      for (let i = 0; i < user.invitedNotification.length; i++) {
        if (user.invitedNotification[i].projectId == req.params.projectId) {
          return res.json({
            msg: `User: ${user.username} has already been invited to this project`
          });
        }
      }
      // Add project to users invite
      user.invitedNotification.push({
        notificationType: "invite",
        projectId: req.params.projectId,
        inviteSenderId: req.params.userId,
        inviteSenderUsername: req.body.inviteSenderUsername,
        inviteSenderImage: req.body.inviteSenderImage,
        projectName: req.body.projectName
      });
      user.save();
      res.status(200).json({ msg: "Invites have been sent!" });
    }
  }
});

//@route    GET /api/user/invite/user/:userId/notification
//@desc     fetch user invite notification
//@access   public
router.get("/invite/user/:userId/notification", async (req, res) => {
  let user = await User.findOne({
    _id: req.params.userId
  });
  // const filterArray = user.invitedNotification.filter(val => {
  //   return val.projectId == req.params.projectId;
  // });
  // console.log("filter array:", filterArray);
  res.json(user.invitedNotification);
});

//@route    DELETE /api/user/:userId/notification/:notificationId
//@desc     remove notification from user
//@access   public
router.delete(
  "/invite/:userId/notification/:notificationId",
  async (req, res) => {
    let user = await User.findOne({
      _id: req.params.userId
    });
    // console.log("Inside remove notification:", user);
    const filterArray = user.invitedNotification.filter(val => {
      return val._id != req.params.notificationId;
    });
    // console.log("filter array:", filterArray);
    user.invitedNotification = filterArray;
    user.save();
    res.json(user.invitedNotification);
  }
);

//@route    POST /api/user/:userId/project/:projectId
//@desc     add user to project
//@access   public
router.post("/invite/:userId/project/:projectId", async (req, res) => {
  // find both user and project
  let user = await User.findOne({
    _id: req.params.userId
  });
  let project = await Project.findOne({
    _id: req.params.projectId
  });

  project.users.push(user._id);
  user.projects.push(req.params.projectId);
  project.save();
  user.save();
  res.json({ msg: "User added to project" });
});

module.exports = router;
