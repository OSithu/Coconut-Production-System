const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({

    blockName:{
        type: String,
        required: true
    },

    area: {
        value: { type: Number, required: true },
        unit: { type: String, enum: ['sqm', 'sqft', 'hectare', 'acre'] } 
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