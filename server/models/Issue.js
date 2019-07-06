const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const issueSchema = new mongoose.Schema(
  {
    issueName: {
      type: String,
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    ownerName: {
      type: String
    },
    issueComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IssueComment"
      }
    ],
    description: {
      type: String
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    active: {
      type: String
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true
  }
);

issueSchema.plugin(mongoosePaginate);

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

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
