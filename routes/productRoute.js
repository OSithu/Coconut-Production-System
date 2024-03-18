const express = require("express");
const Products = require("../models/productModel");

const router = express.Router();

router.post("/products/save", async (req, res) => {
  //instantiation
  try {
    let newProduct = new Products(req.body);

    await newProduct.save();

    return res.status(200).json({
      success: "Details saved successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
