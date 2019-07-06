const mongoose = require("mongoose");

const issueComment = new mongoose.Schema(
  {
    comment: {
      type: String
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    ownerName: {
      type: String
    },
    replies: [
      {
        authorId: { type: mongoose.Types.ObjectId },
        author: { type: String },
        avatar: { type: String },
        reply: { type: String },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true
  }
);

// messageSchema.pre('remove', async function(next){
//     try {
//         //find a user
//         let user = await User.findById(this.user)
//         //remove the id of the message from their messages list
//         user.messages.remove(this.id);
//         //save that user
//         await user.save();
//         //return next
//         return next();
//     } catch (err) {
//         return next(err)
//     }
// });

const IssueComment = mongoose.model("IssueComment", issueComment);
module.exports = IssueComment;
