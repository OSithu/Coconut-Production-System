const express = require("express");
const qcmposts = require('../models/qcmposts');

const router = express.Router();

//save posts
router.post("/qualityrecords/save", async (req, res) => {
  try {
    let newRecord = new qcmposts(req,body);

    await newRecord.save();

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
