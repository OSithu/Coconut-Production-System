const express = require("express");
const finance = require('../models/budgetModels');

const router = express.Router();

//save
router.post("/financeRecords/save", async (req, res) => {
    try {
      let newTransaction = new finance(req.body);
  
      await newTransaction.save();
  
      return res.status(200).json({
        success: "Details saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });


  //get
  router.get("/financeRecords", async (req, res) => {
    try {
      const financerecords = await finance.find().exec();
  
      return res.status(200).json({
        success: true,
        existingfinance: financerecords,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

  //get a specific post
  outer.get("/financeRecords/:id", async (req, res) => {
    try {
        let financerecordID = req.params.id;
        let financerecord = await financeRecords.findById(financerecordID);
        if (!financerecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, financerecord });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


  //update
  router.put("/financerecords/update/:id", async (req, res) => {
    try {
      await finance.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
  
      return res.status(200).json({
        success: "Updated Successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

  //delete
  router.delete("/financerecords/delete/:id", async (req, res) => {
    try {
      const deletedRecord = await finance.findByIdAndDelete(
        req.params.id
      ).exec();
  
      return res.json({
        message: "Delete Successfully",
        deletedRecord,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Deleted unsuccessfully",
        error: err.message,
      });
    }
  });

  module.exports = router;