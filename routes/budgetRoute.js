const express = require("express");
const budget = require('../models/budgetModels');

const router = express.Router();

//save
router.post('/budgetRecords/save', async (req, res) => {
    try {
      let newBudget = new budget(req.body);
  
      await newBudget.save();
  
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
  router.get("/budgetRecords", async (req, res) => {
    try {
      const budgetrecords = await budget.find().exec();
  
      return res.status(200).json({
        success: true,
        existingbudget: budgetrecords,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

  //get a specific post
  router.get("/budgetRecords/:id", async (req, res) => {
    try {
        let budgetrecordID = req.params.id;
        let budgetrecord = await budget.findById(budgetrecordID);
        if (!budgetrecord) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        return res.status(200).json({ success: true, budgetrecord });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
});


  //update
  router.put("/budgetrecords/update/:id", async (req, res) => {
    try {
      await budget.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
  
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
  router.delete("/budgetrecords/delete/:id", async (req, res) => {
    try {
      const deletedRecord = await budget.findByIdAndDelete(
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