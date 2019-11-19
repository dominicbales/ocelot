require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
// const seed = require("./seed");
const path = require("path");
// Importing Sockets
const { launchSockets, app, server, express } = require("./sockets");

// Importing routes
const user = require("./routes/api/user");
const project = require("./routes/api/project");
const issue = require("./routes/api/issue");
const board = require("./routes/api/board");

// Server Config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);
//Routes
app.use("/api/user", user);
app.use("/api/projects", project);
app.use("/api/boards", board);
app.use("/api/issues", issue);

// seed();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

launchSockets();

server.listen(PORT, () =>
  console.log(
    "Running on :3000",
    path.join(__dirname, "../client", "dist", "index.html")
  )
);
