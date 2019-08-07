const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String
    },
    invitedNotification: [
      {
        inviteSenderId: mongoose.Types.ObjectId,
        projectId: mongoose.Types.ObjectId,
        createdAt: { type: Date, default: Date.now }
      }
    ],
    // messages: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Message'
    // }],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log("is password match:", isMatch);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
