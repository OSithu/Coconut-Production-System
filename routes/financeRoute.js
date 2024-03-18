const express = require("express");
const finance = require('../models/financeModels');

const router = express.Router();

//save posts
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

module.exports = router;