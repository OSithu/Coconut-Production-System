const express = require("express");
const Trees = require('../models/treeModel');

// Import our Pest Records Model 
const Spread_Records = require("../models/pestRecordsModel");

const router = express.Router();

//Create Spread Record

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