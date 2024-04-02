const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    orderName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('OrderDetails', orderSchema);