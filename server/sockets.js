const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { User, Project } = require("./models/index");

function launchSockets() {
  io.on("connection", function(socket) {
    console.log("******CONNECTED*********");
    socket.on("joined_project", async data => {
      socket.join(`project/${data.id}`);
      let project = await Project.findOne({
        _id: data.id
      });
      // maybe use object to hold users for faster lookup
      // check if user already exist in the online array of a project
      let doesUserExist = false;
      for (let i = 0; i < project.online.length; i++) {
        if (project.online[i].userId == data.user._id) {
          doesUserExist = true;
          break;
        }
      }
      if (doesUserExist !== true) {
        project.online.push({
          userId: data.user._id,
          username: data.user.username
        });
        project.save();
      }
      io.in(`project/${data.id}`).emit("joined_returned_data", project.online);
    });

    socket.on("remove_user_from_project_online", async data => {
      let project = await Project.findOne({
        _id: data.id
      });

      const filterArray = project.online.filter(val => {
        return val.userId != data.user._id;
      });
      project.online = filterArray;
      project.save();
      io.in(`project/${data.id}`).emit(
        "user_was_removed_online",
        project.online
      );
      socket.leave(`project/${data.id}`);
    });

    socket.on("user_connecting", async value => {
      try {
        let user = await User.findOne({
          _id: value
        });
        user.isOnline = true;
        user.save();
        // socket.emit("user_connected", user);
      } catch (err) {
        console.log("error finding connected user:", err);
      }
    });

    socket.on("disconnecting", async value => {
      try {
        let user = await User.findOne({
          _id: value
        });
        user.isOnline = false;
        user.save();
        // socket.emit("user_disconnected", "User is now offline");
      } catch (err) {
        console.log("error disconnecting user:", err);
      }
    });
  });
}

module.exports = {
  launchSockets,
  app,
  server,
  express
};
