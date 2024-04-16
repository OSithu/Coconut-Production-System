const mongoose = require('mongoose');

const harvestSchema = new mongoose.Schema({

    date:{
        type: Date,
        required: true
    },

    blockName:{
        type: String,
        required: true
    },

    harvest:{
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('HarvestDetails', harvestSchema);