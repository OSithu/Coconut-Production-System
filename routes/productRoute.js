const express = require("express");
const Products = require("../models/productModel");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //5mb
});

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

      let priceValue, priceUnit;

      // Check if price is provided
      if (req.body.price && JSON.parse(req.body.price).value) {
        // If price value is provided, use it
        priceValue = JSON.parse(req.body.price).value;
        priceUnit = JSON.parse(req.body.price).unit;
      } else {
        // If price value is not provided, set both value and unit to "-"
        priceValue = "";
        priceUnit = "-";
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
          data: req.file.buffer, 
          contentType: req.file.mimetype,
        },
        price: { value: priceValue, unit: priceUnit },
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

//get products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    const convertedProducts = products.map((product) => {
      const manufacturedDate = product.manufacturedDate.toISOString().split('T')[0];
      const expirationDate = product.expirationDate.toISOString().split('T')[0];

      return {
        ...product._doc,
        manufacturedDate,
        expirationDate,
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

router.get("/products/:id", async (req, res) => {
  try {
    let productID = req.params.id;
    let product = await Products.findById(productID);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Format the dates without the time component
    const formattedProduct = {
      ...product.toObject(),
      manufacturedDate: product.manufacturedDate
        ? product.manufacturedDate.toISOString().split('T')[0]
        : null,
      expirationDate: product.expirationDate
        ? product.expirationDate.toISOString().split('T')[0]
        : null,
    };

        // Format the price
        const formattedPrice = {
          value: product.price.value,
          unit: product.price.unit,
        };  
        
        formattedProduct.price = formattedPrice;

    return res.status(200).json({ success: true, product: formattedProduct });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

//get products with 'Products' as category
router.get("/productCat", async (req, res) => {
  try {
    const productCat = await Products.find({ category: "Products"});
    const convertedProductCat = productCat.map((productCat) => {

      return {
        ...productCat._doc,
        productImage: productCat.productImage
          ? {
              contentType: productCat.productImage.contentType,
              data:
              productCat.productImage && productCat.productImage.data
                  ? productCat.productImage.data.toString("base64")
                  : "",
            }
          : null,
      };
    });

    return res.status(200).json({
      success: true,
      existingProductCat: convertedProductCat,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


//serve images
router.get("/products/images/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (!product || !product.productImage || !product.productImage.data) {
      return res.status(404).json({ error: "Product image not found" });
    }
    res.set("Content-Type", product.productImage.contentType);
    res.send(product.productImage.data);
  } catch (err) {
    console.error("Error while fetching product image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update product details with image
router.put(
  "/products/update/:id",
  upload.single("productImage"),
  async (req, res) => {
    try {
      const productId = req.params.id;

      // Check if the product exists
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Update product details
      product.productId = req.body.productId;
      product.productName = req.body.productName;
      product.quantity = req.body.quantity;
      product.category = req.body.category;
      product.manufacturedDate = req.body.manufacturedDate;
      product.expirationDate = req.body.expirationDate;
      product.reOrderLevel = req.body.reOrderLevel;
      product.price = JSON.parse(req.body.price);

      // Check if a new image was uploaded
      if (req.file) {
        product.productImage.data = req.file.buffer;
        product.productImage.contentType = req.file.mimetype;
      }

      // Save updated product
      await product.save();

      return res.status(200).json({ success: "Product updated successfully" });
    } catch (err) {
      console.error("Error while updating product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

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
