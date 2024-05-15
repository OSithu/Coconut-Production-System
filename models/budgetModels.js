const mongoose =require('mongoose');

const BudgetpostSchema = new mongoose.Schema({

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
    totalAmount:{
        type:Number,
        required:true
    },
    profitLoss:{
        type:String,
        required:true
    },
});

module.exports =mongoose.model('budgetManagement', BudgetpostSchema)