const mongoose =require('mongoose');

const FinancepostSchema = new mongoose.Schema({

    month:{
        type:String,
        required:true
    },
    totalIncome:{
        type:Number,
        required:true
    },
    totalExpences:{
        type:Number,
        required:true
    },
    profitLoss:{
        type:String,
        required:true
    },
});

module.exports =mongoose.model('financeManagement', FinancepostSchema)