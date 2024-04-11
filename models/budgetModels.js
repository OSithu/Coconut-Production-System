const mongoose =require('mongoose');

const FinancepostSchema = new mongoose.Schema({

    date:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Year:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    }

});

module.exports =mongoose.model('financeManagement', FinancepostSchema)