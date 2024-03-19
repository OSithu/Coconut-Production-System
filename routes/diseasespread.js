const express = require('express');

// Import our user model
const Spread_Records = require('../models/diseasespread');

const router = express.Router();

//Create Spread Record

router.post('/diseasespread/create', async (req, res) => {
    try {
        // Create a new Records instance
        let newSpread = new Spread_Records(req.body);

        // Save the new Records
        await newSpread.save();

        // Return success response
        return res.status(200).json({
            success: "Spread Record saved Successfully"
        });
    } catch (err) {
        // Return error response 
        return res.status(400).json({
            error: err.message
        });
    }
});

//View Spread Records
router.get('/records', async (req, res) => {
    try {
        const records = await Spread_Records.find().exec();
        return res.status(200).json({
            success: true,
            existingRecords: records
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Update Records
router.put('/diseasespread/update/:id', async (req, res) => {
    try {
        await Spread_Records.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        return res.status(200).json({
            success: "Record updated Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//Get Specific Post
router.get("/record/:id", async (req, res) => {
    try {
        let recordID = req.params.id;
        let record = await Spread_Records.findById(recordID);
        if (!record) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, record });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


//Delete Records

router.delete('/diseasespread/delete/:id', async (req, res) => {
    try {
        const deletedRecords = await Spread_Records.findByIdAndDelete(req.params.id).exec();
        return res.status(200).json({
            message: "Records deleted Successfully",
            deletedRecords: deletedRecords
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;
