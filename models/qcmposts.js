const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({
    recordId:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    qualityCheckedDate:{
        type:Date,
        required:true
    },
    specialNotes:{
        type:String,
        required:true
    },
    testResult:{
        type:String,
        required:true
    },
    
});

module.exports = mongoose.model('qualityControl',qualityControlSchema);