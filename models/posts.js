const mongoose =require('models');

const FinancepostSchema = new mongoose.Schema({

    date:{
        type:date,
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
    Income:{
        type:double,
        required:true
    },
    Expences:{
        type:double,
        required:true
    },
    totalAmount:{
        type:double,
        required:true
    }

});

module.exports =mongoose.model('financeManagement', FinancepostSchema)