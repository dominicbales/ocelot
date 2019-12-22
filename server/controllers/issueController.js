const catchAsync = require("../utils/catchAsync");

const { User, Project, Issue, IssueComment } = require("../models/index");

exports.createReply = catchAsync(async (req, res, next) => {
  try {
    //finding a issue
    let issueComment = await IssueComment.findOne({ _id: req.params.id });
    if (issueComment) {
      const newReply = {
        reply: req.body.reply,
        authorId: req.body.userId,
        author: req.body.author,
        avatar: req.body.avatar
      };
      issueComment.replies.push(newReply);
      issueComment.save();
      res.status(200).send("good");
    }
  } catch (err) {
    return next({ status: 400, message: "Cant post issues comments" });
  }
});

exports.createIssueComment = catchAsync(async (req, res, next) => {
  try {
    //finding a issue
    let issue = await Issue.findOne({ _id: req.params.id });
    if (issue) {
      const newIssueComment = new IssueComment({
        comment: req.body.comment,
        ownerId: req.body.userId,
        ownerName: req.body.ownerName,
        ownerImage: req.body.ownerImage
      });
      issue.issueComments.push(newIssueComment._id);
      issue.save();
      newIssueComment.save().then(issue => res.json(issue));
    }
  } catch (err) {
    return next({ status: 400, message: "Cant post issues comments" });
  }
});

exports.fetchIssueComments = catchAsync(async (req, res, next) => {
  try {
    //finding a issue
    let issue = await Issue.findOne({ _id: req.params.id }, function(
      err,
      issue
    ) {
      if (err) {
        console.log("error fetch issue inside server");
      }
    });
    let commentIds = issue.issueComments.map(item => {
      return;
    });
    if (issue) {
      IssueComment.find({ _id: { $in: issue.issueComments } }, function(
        err,
        data
      ) {
        res.status(200).json(data);
      });
    }
  } catch (err) {
    return next({ status: 400, message: "Cant find projects" });
  }
});

exports.createIssue = catchAsync(async (req, res, next) => {
  try {
    //finding a user
    let project = await Project.findOne({ _id: req.params.id });
    if (project) {
      const newIssue = new Issue({
        issueName: req.body.name,
        description: req.body.description,
        ownerId: req.body.userId,
        ownerName: req.body.userName,
        active: req.body.active,
        ownerImage: req.body.profileImage,
        projectId: req.params.id
      });
      project.issues.push(newIssue._id);
      project.save();
      newIssue.save().then(issue => res.json(issue));
    }
  } catch (err) {
    return next({ status: 400, message: "Cant post issues" });
  }
});

exports.setIssueActive = catchAsync(async (req, res, next) => {
  try {
    //finding a user
    let issue = await Issue.findOne({ _id: req.params.id });
    if (issue) {
      issue.active = req.body.active;
      issue.save();
      res.json(issue);
    }
  } catch (err) {
    return next({ status: 400, message: "Cant post issues" });
  }
});

exports.fetchIssues = catchAsync(async (req, res, next) => {
  try {
    const { page } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: 10,
      collation: {
        locale: "en"
      }
    };

    const issuePaginate = Issue.paginate(
      { projectId: req.params.id },
      options,
      function(err, result) {
        if (err) {
          console.log("issue pagin error:", err);
        } else {
          res.json(result);
        }
      }
    );
  } catch (err) {
    return next({ status: 400, message: "Cant find issues" });
  }
});

exports.fetchIssueByID = catchAsync(async (req, res, next) => {
  try {
    //finding a issue
    let issue = await Issue.findOne({ _id: req.params.id }, function(
      err,
      issue
    ) {
      if (err) {
        console.log("error fetch project inside server");
      }
    });
    if (issue) {
      res.json(issue);
    }
  } catch (err) {
    return next({ status: 400, message: "Cant find issue based on ID" });
  }
});
