const mongoose = require("mongoose");
const User = require("./models/user");
const Project = require("./models/projects");
const Issue = require("./models/Issue");
const IssueComment = require("./models/IssueComment");

const data = [
  {
    email: "test@test.com",
    username: "test",
    password: "123456"
  },
  {
    email: "test2@test.com",
    username: "test2",
    password: "123456"
  },
  {
    email: "test3@test.com",
    username: "test3",
    password: "123456"
  }
];

function seedDB() {
  //Remove all projects and user
  IssueComment.remove({}, function(err) {
    if (err) {
      console.log("ERROR...Issue comments couldnt be removed");
    } else {
      console.log("removed Issues comments!");
    }
  });
  Issue.remove({}, function(err) {
    if (err) {
      console.log("ERROR...Issue couldnt be removed");
    } else {
      console.log("removed Issues!");
    }
  });
  Project.remove({}, function(err) {
    if (err) {
      console.log("ERROR...project couldnt be removed");
    } else {
      console.log("removed projects!");
    }
  });
  User.remove({}, function(err) {
    if (err) {
      console.log("ERROR...User couldnt be removed");
    } else {
      console.log("removed Users!");
    }
    //ADD FEW users
    data.forEach(function(seed) {
      User.create(seed, function(err, user) {
        if (err) {
          console.log(err);
        } else {
          // console.log("user Added:", user);
          //ADD Few projects
          Project.create(
            {
              name: "test project",
              owner: user._id
            },
            function(err, project) {
              if (err) {
                console.log(err);
              }

              // if(err){
              //     console.log(err);
              // } else {
              //     // console.log('PROJECTS IS:', project)
              //     Project.projects.push(project);
              //     Project.save();
              //     console.log("Created new project");
              // }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
