const mongoose = require('mongoose');

const chatMsgSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},  {
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

const ChatMsg = mongoose.model('ChatMsg', chatMsgSchema);
module.exports = ChatMsg;