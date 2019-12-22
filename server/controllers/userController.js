const catchAsync = require("../utils/catchAsync");
const { User, Project } = require("../models/index");

exports.getMe = (req, res, next) => {
  console.log("User Id inside userController:", req.user.id);
  req.params.id = req.user.id;
  next();
};

// gets all the users from a list of Id, redo this function
exports.getUsersFromListOfId = catchAsync(async (req, res, next) => {
  try {
    const usersObjKeys = Object.keys(req.body);
    const usersArray = [];
    for (let i = 0; i < usersObjKeys.length; i++) {
      let user = await User.findOne({
        _id: usersObjKeys[i]
      });
      usersArray.push(user);
    }
    res.status(200).json(usersArray);
  } catch (err) {
    console.log("Error: getting list of users:", err);
  }
});

exports.searchUserByName = catchAsync(async (req, res, next) => {
  let user = await User.find({
    username: { $regex: "^" + req.params.name }
  });
  const filterArray = user.map(val => {
    let { email, username, _id } = val;
    return { email, username, _id };
  });
  return res.status(200).json(filterArray);
});

exports.addUserToProject = catchAsync(async (req, res, next) => {
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

exports.inviteUserToProject = catchAsync(async (req, res, next) => {
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

exports.fetchUserNotification = catchAsync(async (req, res, next) => {
  let user = await User.findOne({
    _id: req.params.userId
  });
  // const filterArray = user.invitedNotification.filter(val => {
  //   return val.projectId == req.params.projectId;
  // });
  // console.log("filter array:", filterArray);
  res.json(user.invitedNotification);
});

exports.deleteNotificationFromUser = catchAsync(async (req, res, next) => {
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
});
