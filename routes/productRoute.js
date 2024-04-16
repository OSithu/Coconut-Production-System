const express = require("express");
const Products = require("../models/productModel");
const multer = require("multer");

const router = express.Router();

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
const storage = multer.memoryStorage();


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //5mb
});

// //save products
// router.post("/products/save", async (req, res) => {
//   //instantiation
//   try {A
//     //check if productID already exists in the database
//     const existingProductID = await Products.findOne({productId: req.body.productId})
//     if(existingProductID) {
//       return res.status(400).json({ error: "Product ID already exists"});
//     }

//     const existingProductName = await Products.findOne({productName: req.body.productName})
//     if (existingProductName) {
//       return res.status(400).json({error: "Product Name already exists"});
//     }

//     //if productID doesn't exists, save new product details
//     let newProduct = new Products(req.body);

//     await newProduct.save();

//     return res.status(200).json({
//       success: "Details saved successfully.",
//     });

//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

//save products with image
router.post(
  "/products/save",
  upload.single("productImage"),
  async (req, res) => {
    //instantiation
    try {
      //check if productID already exists in the database
      const existingProductID = await Products.findOne({
        productId: req.body.productId,
      });
      if (existingProductID) {
        return res.status(400).json({ error: "Product ID already exists" });
      }

      const existingProductName = await Products.findOne({
        productName: req.body.productName,
      });
      if (existingProductName) {
        return res.status(400).json({ error: "Product Name already exists" });
      }

      //if productID doesn't exists, save new product details
      let newProduct = new Products({
        productId: req.body.productId,
        productName: req.body.productName,
        quantity: req.body.quantity,
        category: req.body.category,
        manufacturedDate: req.body.manufacturedDate,
        expirationDate: req.body.expirationDate,
        reOrderLevel: req.body.reOrderLevel,
        productImage: {
          data: req.file.buffer, // Correctly assign Multer buffer to data field
          contentType: req.file.mimetype,
        },
      });

      // Save the new product to the database
      await newProduct.save();

      return res.status(200).json({
        success: "Details saved successfully.",
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }
);

// //get products
// router.get("/products", async (req, res) => {
//   try {
//     const products = await Products.find().exec();

//     return res.status(200).json({
//       success: true,
//       existingProducts: products,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

//get products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    const convertedProducts = products.map((product) => {
      return {
        ...product._doc,
        productImage: product.productImage
          ? {
              contentType: product.productImage.contentType,
              data:
                product.productImage && product.productImage.data
                  ? product.productImage.data.toString("base64")
                  : "",
            }
          : null,
      };
    });

    return res.status(200).json({
      success: true,
      existingProducts: convertedProducts,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// //serve images
// router.get("/products/images/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Products.findById(productId);
//     if (!product || !product.productImage || !product.productImage.data) {
//       return res.status(404).json({ error: "Product image not found" });
//     }
//     res.set("Content-Type", product.productImage.contentType);
//     res.send(product.productImage.data);
//   } catch (err) {
//     console.error("Error while fetching product image:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

//get a specific product details
router.get("/products/:id", async (req, res) => {
  try {
    let productID = req.params.id;
    let product = await Products.findById(productID);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
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

// Update product quantity
router.put("/products/updateQuantity/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const additionalQuantity = req.body.quantity;

    // Find the product by productId and update its quantity
    const product = await Products.findOne({ productId: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }

    // Calculate new quantity
    const newQuantity = product.quantity + additionalQuantity;

    // Update product quantity
    await Products.findOneAndUpdate(
      { productId: productId },
      { $set: { quantity: newQuantity } }
    );

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully.",
    });
  } catch (error) {
    console.error("Error occurred while updating product quantity:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update product quantity." });
  }
});

//edit  product quantity
router.put("/products/editQuantity/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const editedQuantity = req.body.quantity;
    const existedQuantity = req.body.existedQuantity;

    // Find the product by productId and update its quantity
    const product = await Products.findOne({ productId: productId });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found." });
    }

    // Calculate new quantity
    const newQuantity = product.quantity - existedQuantity + editedQuantity;

    // Update product quantity
    await Products.findOneAndUpdate(
      { productId: productId },
      { $set: { quantity: newQuantity } }
    );

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully.",
    });
  } catch (error) {
    console.error("Error occurred while updating product quantity:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update product quantity." });
  }
});

module.exports = router;
