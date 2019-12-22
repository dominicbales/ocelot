const gravatar = require("gravatar");
const catchAsync = require("../utils/catchAsync");

const { User, Project } = require("../models/index");

exports.createBoard = catchAsync(async (req, res, next) => {
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
});

exports.fetchUserProjectByOwner = catchAsync(async (req, res, next) => {
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
});

exports.fetchUserProjectsByArray = catchAsync(async (req, res, next) => {
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
});

exports.fetchUserProjectByID = catchAsync(async (req, res, next) => {
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
});
