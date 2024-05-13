const express = require("express");


// Import our Diseases  Model
const Disease = require("../models/diseaseModel");

const router = express.Router();

//Create Diseases

router.post("/diseases/create", async (req, res) => {
  try {

    // Create a new Records instance
    let newDisease= new Disease(req.body);

    // Save the new Records
    await newDisease.save();

    // Return success response
    return res.status(200).json({
      success: "New Disease Details saved Successfully",
      message: "New Disease Details Added Successfully",
    });
  } catch (err) {
    // Return error response
    return res.status(400).json({
      error: err.message,
    });
  }
});

//View Diseases
router.get("/diseases", async (req, res) => {
  try {
    const diseases = await Disease.find().exec();
    return res.status(200).json({
      success: true,
      existingDiseases: diseases,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//Update Diseases
router.put("/disease/update/:id", async (req, res) => {
  try {
    await Disease.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();
    return res.status(200).json({
      success: "Disease Details updated Successfully",
      message: "Disease Details updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//Get Specific Disease
router.get("/disease/:id", async (req, res) => {
  try {
    let disease_ID = req.params.id;
    let disease_record = await Disease.findById(disease_ID);
    if (!disease_record) {
      return res
        .status(404)
        .json({ success: false, message: "Details not found" });
    }
    return res.status(200).json({ success: true, disease_record });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//Delete Diseases

router.delete("/disease/delete/:id", async (req, res) => {
  try {
    const deletedDiseases = await Disease.findByIdAndDelete(
      req.params.id
    ).exec();
    return res.status(200).json({
      message: "Details deleted Successfully",
      deletedDiseases: deletedDiseases,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
