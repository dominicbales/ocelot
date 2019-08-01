const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
// const keys = require('./keys.js');

// var cookieExtractor = function(req) {
//     var token = null;
//     if (req && req.cookies) token = req.cookies['jwt'];
//     return token;
// };

const opts = {};
// check token in cookie
// opts.jwtFromRequest = cookieExtractor;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
// opts.secretOrKey = keys.SECRET_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          console.log("wrong");
          return done(null, false);
        })
        .catch(err => console.log("Error: ", err));
    })
  );
};
