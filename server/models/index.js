const mongoose = require("mongoose");
// const keys = require("../config/keys");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true });

module.exports.User = require("./user");
module.exports.Project = require("./projects");
module.exports.Message = require("./messages");
module.exports.Issue = require("./Issue");
module.exports.IssueComment = require("./IssueComment");
