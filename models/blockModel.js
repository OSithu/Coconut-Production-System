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
        default: null,
        required: false
    },

    nextHarvesting:{
        type: Date,
        default: null,
        required: false
    },  

    lastFertilized:{
        type: Date,
        default: null,
        required: false
    },

    nextFertilization:{
        type: Date,
        default: null,
        required: false
    }

});

module.exports = mongoose.model('BlockDetails',blockSchema);