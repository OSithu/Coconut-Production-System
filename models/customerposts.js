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
    contactNumber:{
        type:String,
        required:true
    },
    cusLocation:{
        type:String,
        required:true
    },	
	  username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userRole:{
        type:String,
        required:false,
		    default: "Customer"
    }
});

module.exports = mongoose.model('CustomerDetails', customerSchema);