const jwt = require("jsonwebtoken");
// const keys = require('../config/keys')

//make sure user is logged -- Authenication
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
