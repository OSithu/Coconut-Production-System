const express = require("express");
const Products = require("../models/productModel");

const router = express.Router();

//save products
router.post("/products/save", (req, res) => {
  let newProduct = new Products(req.body);

  newProduct.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Saved successfully",
    });
  });
});

module.exports = router;
