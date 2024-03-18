const express = require("express");
const CustomerDetails = require("../models/customerposts");

const router = express.Router();

//save posts
router.post("/cusDetails/save", async (req, res) => {
  try {
    let newCustomer = new CustomerDetails(req.body);

    await newCustomer.save();

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
