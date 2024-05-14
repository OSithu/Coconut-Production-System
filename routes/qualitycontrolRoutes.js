const express = require("express");
const qualityControl = require("../models/qcmposts");
const product = require("../models/productModel")

// const Products = require("../models/productModel");

const router = express.Router();

//save records
router.post("/qualityrecords/save", async (req, res) => {
  try {

    // Check if recordID already exists in the database
    const existingRecord = await qualityControl.findOne({ recordId: req.body.recordId });
    if (existingRecord) {
      return res.status(400).json({ error: "Record ID already exists" });
    }

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

    const formattedRecords = qualityrecords.map(records => ({
      ...records.toObject(),
      qualityCheckedDate: records.qualityCheckedDate?.toISOString()?.split('T')[0]
    }));

    return res.status(200).json({
      success: true,
      existingQualityRecords: formattedRecords,
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

// router.get("/qProduct", async (req, res) => {
//   try {
//     const productCat = await Products.find({ $or: [{ category: "Products" }, { category: "By-products" }] });
//     const convertedProductCat = productCat.map((productCat) => {

//       return {
//         ...productCat._doc,
//         productImage: productCat.productImage
//           ? {
//               contentType: productCat.productImage.contentType,
//               data:
//               productCat.productImage && productCat.productImage.data
//                   ? productCat.productImage.data.toString("base64")
//                   : "",
//             }
//           : null,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       existingProductCat: convertedProductCat,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

module.exports = router;
