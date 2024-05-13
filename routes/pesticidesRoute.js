const express = require("express");


// Import our Pestcides  Model
const Pestcides = require("../models/pesticidesModel");

const router = express.Router();

//Create Pestcides

router.post("/pestcides/create", async (req, res) => {
  try {

    // Create a new Records instance
    let newPestcides= new Pestcides(req.body);

    // Save the new Records
    await newPestcides.save();

    // Return success response
    return res.status(200).json({
      success: "New Pestcides Details saved Successfully",
      message: "New Pestcides Details Added Successfully",
    });
  } catch (err) {
    // Return error response
    return res.status(400).json({
      error: err.message,
    });
  }
});

//View Pestcides
router.get("/pestcides", async (req, res) => {
  try {
    const pestcides = await Pestcides.find().exec();
    return res.status(200).json({
      success: true,
      existingPestcides: pestcides,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//Update Pestcides
router.put("/pestcides/update/:id", async (req, res) => {
  try {
    await Pestcides.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();
    return res.status(200).json({
      success: "Pestcides Details updated Successfully",
      message: "Pestcides Details updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//Get Specific Pestcides
router.get("/pestcide/:id", async (req, res) => {
  try {
    let pestcide_ID = req.params.id;
    let pestcide_record = await Pestcides.findById(pestcide_ID);
    if (!pestcide_record) {
      return res
        .status(404)
        .json({ success: false, message: "Details not found" });
    }
    return res.status(200).json({ success: true, pestcide_record });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//Delete Pestcides

router.delete("/pestcide/delete/:id", async (req, res) => {
  try {
    const deletedPestcides = await Pestcides.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.status(200).json({
      message: "Details deleted Successfully",
      deletedPestcides: deletedPestcides,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
