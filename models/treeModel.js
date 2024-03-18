const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({

    treeID:{
        type: String,
        required: true
    },

    typeOfTree:{
        type: String,
        required: true
    },

    plantedDate:{
        type: Date,
        required: true
    },

    blockName:{
        type: String,
        required: true
    },

    specialNotes:{
        type: String,
        required: false
    }  

});

module.exports = mongoose.model('TreeDetails',treeSchema);