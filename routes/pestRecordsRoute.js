const express = require("express");
const Trees = require('../models/treeModel');

// Import our Pest Records Model 
const Pest_Add_Records = require("../models/pestRecordsModel");

const router = express.Router();

//Create Pest Add Record

router.post("/pestrecord/create", async (req, res) => {
    try {
      // Check if treeID already exists in the database
      const existingTree = await Trees.findOne({ treeID: req.body.treeID });
      if (!existingTree) {
        return res.status(400).json({ error: "Tree ID is Invalid" });
      }
      // Create a new Records instance
      let newPestRecord = new Pest_Add_Records(req.body);
  
      // Save the new Records
      await newPestRecord.save();
  
      // Return success response
      return res.status(200).json({
        success: "Pest Record saved Successfully",
        message: "Pest Record Added Successfully",
      });
    } catch (err) {
      // Return error response
      return res.status(400).json({
        error: err.message,
      });
    }
  });

//View Pest Add Records
router.get("/pestaddrecords", async (req, res) => {
    try {
      const pestaddrecords = await Pest_Add_Records.find().exec();
      return res.status(200).json({
        success: true,
        existingPestAddRecords: pestaddrecords,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });


//Update Pest Add Records
router.put("/pestrecord/update/:id", async (req, res) => {
    try {
      await Pest_Add_Records.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }).exec();
      return res.status(200).json({
        success: "Pest Add Record updated Successfully",
        message: "Pest Add Record updated Successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

 

  module.exports = router;
