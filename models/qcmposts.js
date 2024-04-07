const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({

    RecordId:{
        type:String,
        required:true
    },
    ProductType:{
        type:String,
        required:true
    },
    QualityCheckedDate:{
        type:Date,
        required:true
    },
    SpecialNotes:{
        type:String,
        required:true
    },
    TestResult:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model('qualityControl',qualityControlSchema);