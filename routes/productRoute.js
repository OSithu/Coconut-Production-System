const express = require("express");
const Products = require("../models/productModel");

const router = express.Router();

//save products
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

//get products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find().exec();

    return res.status(200).json({
      success: true,
      existingProducts: products,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

//get a specific product details
// router.get("/products/:id",(req,res) =>{
//   let productID = req.params.id;

//   Products.findById(productID,(err,post) =>{
//     if(err){
//       return res.status(400).json({success:false,err})
//     }

//     return res.status(200).json({
//       success:true,
//       post
//     })
//   })
// })

router.get("/products/:id", async (req, res) => {
  try {
      let productID = req.params.id;
      let product = await Products.findById(productID);
      if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, product });
  } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
});


//update products
router.put("/products/update/:id", async (req, res) => {
  try {
    await Products.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();

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
router.delete("/products/delete/:id", async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(
      req.params.id
    ).exec();

    return res.json({
      message: "Delete Successfully",
      deletedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Deleted unsuccessfully",
      error: err.message,
    });
  }
});

module.exports = router;
