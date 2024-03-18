const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    cusName:{
        type:String,
        required:true
    },
    cusEmail:{
        type:String,
        required:true
    },
    cusPhone:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('CustomerDetails', customerSchema);