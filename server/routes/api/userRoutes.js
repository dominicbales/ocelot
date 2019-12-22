const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../../controllers/userController");
const authController = require("../../controllers/authController");

//@route    GET /api/user/register
//@desc     register users
//@access   public
router.post("/register", authController.register);

//@route    GET /api/user/login
//@desc     login User / Returning JWT Token
//@access   public
router.post("/login", authController.login);

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

//@route    GET /api/user/
//@desc     get users from an SET of IDs
//@access   public
router.post("/", userController.getUsersFromListOfId);

//@route    POST /api/user/invite/:projectId/user/:userId
//@desc     invite user to project
//@access   public
// this might be better as a project route
router.post(
  "/invite/:projectId/user/:userId",
  userController.inviteUserToProject
);

//@route    POST /api/user/:userId/project/:projectId
//@desc     add user to project
//@access   public
// might need to change this to project route
router.post(
  "/invite/:userId/project/:projectId",
  userController.addUserToProject
);

//@route    GET /api/user/invite/user/:userId/notification
//@desc     fetch user invite notification
//@access   public
router.get(
  "/invite/user/:userId/notification",
  userController.fetchUserNotification
);

//@route    DELETE /api/user/:userId/notification/:notificationId
//@desc     remove notification from user
//@access   public
router.delete(
  "/invite/:userId/notification/:notificationId",
  userController.deleteNotificationFromUser
);

//@route    GET /api/user/search/:name
//@desc     search for user by name
//@access   public
router.get("/search/:name", userController.searchUserByName);

module.exports = router;
