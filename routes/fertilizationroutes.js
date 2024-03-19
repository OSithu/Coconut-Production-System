const express = require('express');
const fertilization =require('../models/fertilizationModel');

//send requests 
const router = express.Router();

//save Fertilization records

router.post('/fertilizationrec/save',async (req,res)=>{
    //instantiation 
    try{
    let newFertilizationRecord=new fertilization(req.body);

    await newFertilizationRecord.save();

    return res.status(200).json({
        success:"Details saved successfully!!."
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

//Get Specific Record
router.get("/fertilizationrec/:id", async (req, res) => {
    try {
        let fertilizationId = req.params.id;
        let record = await fertilization.findById(fertilizationId);
        if (!record) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, record });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


//Update fertilization Records

router.put('/fertilizationrec/update/:id', async (req, res) => {

    try {

        await fertilization.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();

        return res.status(200).json({

            success: "Record updated Successfully"

        });

    } catch (err) {

        return res.status(400).json({

            error: err.message

        });

    }

});

//Delete fertilization Records
 
router.delete('/fertilizationrec/delete/:id', async (req, res) => {
    try {
        const deletedfertilizationRecords = await fertilization.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json({
            message: "Records deleted Successfully",
            deletedRecords: deletedfertilizationRecords
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});
 
module.exports =router;