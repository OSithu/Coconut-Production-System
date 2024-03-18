const mongoose = require('mongoose');

const FertilizationSchema = new mongoose.Schema({

    TreeNo:{
        type:String,
        required:true
    },

    TreeStage:{
        type:String,
        required:true
    },

    Date:{
        type:Date,
        required:true
    },

    UreaAmount:{
        type:Double,
        required:true
    },

    EppawalaRockPhosphateAmout:{
        type:Double,
        required:true
    },

    MuriateOfPotasium:{
        type:Double,
        required:true
    },

    Dolamite:{
        type:Double,
        required:true
    },

    Description:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Fertilization',FertilizationSchema)