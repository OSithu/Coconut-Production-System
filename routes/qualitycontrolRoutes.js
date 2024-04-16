const express = require("express");
const qualityControl = require("../models/qcmposts");

const router = express.Router();

//save records
router.post("/qualityrecords/save", async (req, res) => {
  try {
    let newRecord = new qualityControl(req.body);

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

//get record
router.get("/qualityrecords", async (req, res) => {
  try {
    const qualityrecords = await qualityControl.find().exec();

    return res.status(200).json({
      success: true,
      existingQualityRecords: qualityrecords,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get a specific record
router.get("/qualityrecords/:id", async (req, res) => {
  try {
    let recordId = req.params.id;
    let records = await qualityControl.findById(recordId);
    if (!records) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, records });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});


//update record
router.put("/qualityrecords/update/:id",async (req, res) => {
  try{
    await qualityControl.findByIdAndUpdate(req.params.id, { $set: req.body}).exec();

    return res.status(200).json({
      success: "Updated Successfully",
    });
  }catch(err){
        return res.status(400).json({
           error: err.message,
        });
  }
});

//delete record
router.delete("/qualityrecords/delete/:id", async (req, res) => {
  try {
      const deleteRecords = await qualityControl.findByIdAndDelete(req.params.id).exec();
      return res.json({
          message: "Record Deleted Successfully",
          deleteRecords,
      });
  } catch (err) {
      return res.status(400).json({
          message: "Delete unsuccessfull",
          error: err.message
      });
  }
});

// router.get("/qrecords/:id", async (req, res) => {
//   try {
//       let RecordId = req.params.id;
//       let records = await qualityControl.findById(mongoose.Types.ObjectId(RecordId)); // Convert id to ObjectId
//       if (!records) {
//           return res.status(404).json({ success: false, message: "Record not found" });
//       }
//       return res.status(200).json({ success: true, records });
//   } catch (err) {
//       return res.status(400).json({ success: false, error: err.message });
//     }
// });


module.exports = router;
