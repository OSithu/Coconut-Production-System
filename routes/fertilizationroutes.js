const express = require('express');
const fertilization =require('../models/fertilizationModel');


//send requests 
const router = express.Router();

//save Fertilization records

router.post('/fertilizationrec/save',async (req,res)=>{
    try{
    let newFertilizationRecord=new fertilization(req.body);

    await newFertilizationRecord.save();

    return res.status(200).json({
        success:" Details saved successfully!"
    });

}catch(err){
    
    return res.status(400).json({
                error:err.message
            });
       
        }
    });  

 //View Fertilization Records
router.get('/fertilizationrec', async (req, res) => {
    try {
        const fertilizationrecords = await fertilization.find().exec();
        return res.status(200).json({
            success: true,
            existingRecords: fertilizationrecords
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});
module.exports =router;