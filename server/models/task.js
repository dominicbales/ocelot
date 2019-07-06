const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // task: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Task'
    // }],
},  {
    timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;