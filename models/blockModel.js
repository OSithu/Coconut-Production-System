const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({

    blockName:{
        type: String,
        required: true
    },

    area:{
        type: Number,
        required: true
    },

    treeCount:{
        type: Number,
        required: true
    },

    lastHarvested:{
        type: Date,
        required: false
    },

    nextHarvesting:{
        type: Date,
        required: false
    },  

    lastFertilized:{
        type: Date,
        required: false
    },

    nextFertilization:{
        type: Date,
        required: false
    }

});

module.exports = mongoose.model('BlockDetails',blockSchema);