const express = require('express');
const fertilization =require('../models/fertilizationModel');

//send requests 
const router = express.Router();

//save Fertilization records

router.post('/post/save',(req,res)=>{
    //instentiation 
    let newFertilizationRecord=new fertilization(req,body);

    newFertilizationRecord.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
//get the save status
        return res.status(200).json({
            success:"Details saved successfully"
        });
    });
});

module.exports =router;