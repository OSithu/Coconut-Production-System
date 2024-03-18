const mongoose = require('mongoose');

//Create Models
const spreadSchema = new mongoose.Schema({

    treeID:{
        type:String,
        required:true
    },
    identifyDate:{
        type:Date,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    spreadLevel:{
        type:String,
        required:true
    },
    specialNote:{
        type:String,
        required:true
    },

});

//model export
module.exports = mongoose.model('Spread_Records',spreadSchema);
