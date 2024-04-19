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

    FertilizationDate:{
        type:Date,
        required:true
    },

    UreaAmount:{
        type:Number,
        required:true
    },

    EppawalaRockPhosphateAmount:{
        type:Number,
        required:true
    },

    MuriateOfPotasiumAmount:{
        type:Number,
        required:true
    },

    DolamiteAmount:{
        type:Number,
        required:true
    },

    // Description:{
    //     type:String,
    //     required:true
    // }

})

module.exports = mongoose.model('Fertilization',FertilizationSchema)