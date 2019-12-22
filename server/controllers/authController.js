const catchAsync = require("../utils/catchAsync");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { User } = require("../models/index");

exports.register = catchAsync(async (req, res, next) => {
  try {
    //create a user
    let user = await User.create(req.body);
    const avatar = gravatar.url(req.body.email, {
      d: "mp" //Default
    });
    user.profileImageUrl = avatar;
    user.save();
    let { _id, username, profileImageUrl } = user;
    //create a token (signing a token)
    let token = jwt.sign(
      {
        _id,
        username
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      _id,
      username,
      token
    });
  } catch (err) {
    //see what kind of error
    //if it is a certain error
    //respond with username/email already taken
    //otherwise just send back a generic 400

    //if a validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    //finding a user
    let user = await User.findOne({
      email: req.body.email
    });
    let { _id, username, projects, email, password, profileImageUrl } = user;
    //checking if their password matches what was sent to the server]
    let isMatch = await user.comparePassword(req.body.password);
    //if it all matches
    if (isMatch) {
      let token = jwt.sign(
        {
          _id,
          username,
          projects,
          email,
          password,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      // send a cookie with jwt token
      // res.cookie('jwt',token);
      return res.status(200).json({
        success: true,
        message: "Authentication successful!",
        token
      });
    } else {
      return next({
        success: false,
        status: 400,
        message: "Invalid if/else error Email/Password"
      });
    }
  } catch (err) {
    return next({ status: 400, message: "CATCH: Invalid Email/Password" });
  }
});

// (exports.isLoggedIn = passport.authenticate("jwt", { session: false })),
//   (req, res) => {
//     res.json({ msg: "Success passport" });
//   };

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please login first"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please login first"
    });
  }
};
