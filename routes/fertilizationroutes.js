const express = require('express');
const fertilization =require('../models/fertilizationModel');

//send requests 
const router = express.Router();

//save Fertilization records

router.post('/post/save',async (req,res)=>{
    //instantiation 
    try{
    let newFertilizationRecord=new fertilization(req.body);

    await newFertilizationRecord.save();

    return res.status(200).json({
        success:"Details saved successfully."
    });

}catch(err){
    
    return res.status(400).json({
                error:err.message
            });
       
        }
    });  
module.exports =router;