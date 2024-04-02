const express = require("express");
const ProductCnt = require("../models/productCntModel");

const router = express.Router();

//save products
router.post("/productCnt/save", async (req, res) => {
  //instantiation
  try {
    let newProductCnt = new ProductCnt(req.body);

    await newProductCnt.save();

    return res.status(200).json({
      success: "Details saved successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get products
router.get("/productCnt", async (req, res) => {
  try {
    const productCnt = await ProductCnt.find().exec();

    return res.status(200).json({
      success: true,
      existingProductCnt: productCnt,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get a specific product details
router.get("/productsCnt/:id", async (req, res) => {
  try {
    let productID = req.params.id;
    let productCnt = await ProductCnt.findById(productID);
    if (!productCnt) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }
    return res.status(200).json({ success: true, productCnt });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//update products
router.put("/productCnt/update/:id", async (req, res) => {
  try {
    await ProductCnt.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();

    return res.status(200).json({
      success: "Updated Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//delete products
router.delete("/productCnt/delete/:id", async (req, res) => {
    try {
      const deletedProductCnt = await ProductCnt.findByIdAndDelete(
        req.params.id
      ).exec();
  
      return res.json({
        message: "Delete Successfully",
        deletedProductCnt,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Deleted unsuccessfully",
        error: err.message,
      });
    }
  });

module.exports = router;
