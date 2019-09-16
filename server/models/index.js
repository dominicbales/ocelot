const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports.User = require("./user");
module.exports.Project = require("./projects");
module.exports.Message = require("./messages");
module.exports.Issue = require("./Issue");
module.exports.IssueComment = require("./IssueComment");
module.exports.Board = require("./boards");
