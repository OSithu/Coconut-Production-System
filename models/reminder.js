const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    message: String,
    created_art:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('reminder', reminderSchema);