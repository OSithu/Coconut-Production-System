const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

   fullName:{
      type :String,
      required: true
   },

   NIC:{
    type : String,
    required :true
  },

   dateOfBirth:{
      type : Date,
      required :true
   },

   gender: {
     type:String,
     required :true
   },
 
   contactNumber :{
     type:String,
     required :true
   },

   contactEmail :{
     type:String,
     required :true
   },

   address :{
     type : String,
     required : true
   },

   jobTitle :{
     type : String,
     required : true
   },
   department :{
     type : String,
     required :true
   },
   startDate :{
    type : Date,
    required : true
   }

});

module.exports = mongoose.model('employee',employeeSchema);