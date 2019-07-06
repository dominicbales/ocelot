// const express = require('express');
require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./models");
const passport = require("passport");
const PORT = 3000;
const seed = require("./seed");

// Importing routes
const user = require("./routes/api/user");
const project = require("./routes/api/project");
const issue = require("./routes/api/issue");
// const issueComment = require('./routes')

// Server Config
// const app = express();
app.use(cors());

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);
//Routes
app.use("/api/user", user);
app.use("/api/projects", project);
app.use("/api/issues", issue);
// app.use('/api/issue/comment',)

seed();

app.get("/", function(req, res) {
  res.send("ayyyy dkjasfklj");
});

io.on("connection", function(socket) {
  console.log("******CONNECTED*********");
  socket.on("test", data => {
    console.log("just testing:", data);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // socket.on('add_notification', async (data) => {
  //     let user = await db.User.findOne({
  //         email: data.email
  //     });
  //     db.Project.create(
  //         {
  //            name: 'socket project',
  //         }, function(err, project){
  //             if(err){
  //                 console.log(err);
  //             } else {
  //                 console.log('PROJECTS IS:', project)
  //                 user.projects.push(project);
  //                 user.save();
  //                 io.emit('show_notification', project)
  //                 console.log("Created new project");
  //             }
  //         });

  // })
});

server.listen(PORT, () => console.log("Running for my life on :3000"));
