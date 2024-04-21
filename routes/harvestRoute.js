const express = require('express');
const Harvest = require('../models/harvestModel');

const router = express.Router();

//create
router.post('/harvest/save', async (req, res) => {
    try {
        let newHarvest = new Harvest(req.body);
        await newHarvest.save();
        return res.status(200).json({
            success: "Details saved successfully."
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

//read
router.get("/harvest", async (req, res) => {
    try {
        const harvest = await Harvest.find().exec();

        const formattedHarvest = harvest.map(harvest => ({
            ...harvest.toObject(),
            date: harvest.date?.toISOString()?.split('T')[0]
        }));

        return res.status(200).json({
            success: true,
            existingHarvest: formattedHarvest,
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
});

//update
router.patch("/harvest/update/:id", async (req, res) => {
    try {
        await Harvest.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        return res.status(200).json({
            success: "Successfully Updated"
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        })
    }
});

//delete
router.delete("/harvest/delete/:id", async (req, res) => {
    try {
        const harvestDelete = await Harvest.findByIdAndDelete(req.params.id).exec();
        return res.json({
            message: "Successfully Deleted",
            harvestDelete,
        });
    }
    catch (err) {
        return req.status(400).json({
            message: "Unsuccessfull",
            error: err.message
        });
    }
});

//get a specific record using id
router.get("/harvest/:id", async (req, res) => {
    try {
        let harvestID = req.params.id;
        let harvest = await Harvest.findById(harvestID);
        if (!harvest) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            })
        }
        return res.status(200).json({
            success: true,
            harvest
        })
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;