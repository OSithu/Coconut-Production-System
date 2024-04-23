const mongoose = require('mongoose')

const sheduleSchema = new mongoose.Schema({

   Department:{
      type :String,
      required: true
   },

   Tasks:{
      type : String,
      required :true
   },

   startDate: {
     type:Date,
     required :true
   },
 
   EndDate :{
     type:Date,
     required :true
   },

   PriorityLevel :{
     type:String,
     required :true
   }

});

module.exports = mongoose.model('workshedule',sheduleSchema);