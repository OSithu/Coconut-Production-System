const mongoose = require('mongoose');

const harvestScheduleSchema = new mongoose.Schema({

    date:{
        type: Date,
        required: true
    },

    blockName:{
        type: String,
        required: true
    },

    inCharge:{
        type: String,
        required: true
    },

    staff01:{
        type: String,
        required: true
    },

    staff02:{
        type: String,
        required: true
    },

    staff03:{
        type: String,
        required: true
    },

    assignedDate:{
        type: Date,
        required: false
    }

});

module.exports = mongoose.model('HarvestSchedules', harvestScheduleSchema);