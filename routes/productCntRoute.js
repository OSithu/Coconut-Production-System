const express = require("express");
const ProductCnt = require("../models/productCntModel");
const Products = require("../models/productModel");

const router = express.Router();

// Save product count
router.post("/productCnt/save", async (req, res) => {
  try {
    // // Check if the product exists in the Products collection
    // const existingProduct = await Products.findOne({
    //   productId: req.body.productId,
    // });

    // if (!existingProduct) {
    //   // If the product does not exist, return an error
    //   return res.status(400).json({ error: "Product ID does not exist." });
    // }

    // If the product exists, save the new product count
    const newProductCnt = new ProductCnt(req.body);
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

    const formattedPRecords = productCnt.map((productCnt) => ({
      ...productCnt.toObject(),
      productDate: productCnt.productDate?.toISOString()?.split('T')[0],
    }));

    return res.status(200).json({
      success: true,
      existingProductCnt: formattedPRecords,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get a specific product details
router.get("/productCnt/:id", async (req, res) => {
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

//update product Cnt
router.put("/productCnt/update/:id", async (req, res) => {
  try {
    await ProductCnt.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }).exec();

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

//get product ID from product table
router.get("/productsDet", async (req, res) => {
  try {
    const product = await Products.find().exec();

    return res.status(200).json({
      success: true,
      existingProducts: product
    });
  }catch (err){
    return res.status(400).json({
      error:err.message
    });
  }
})
module.exports = router;

