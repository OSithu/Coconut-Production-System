const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    data: Buffer,
    contentType: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityUnit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  manufacturedDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  reOrderLevel: {
    type: Number,
    required: true,
  },
  price: {
    unit: { type: String, enum: ["Rs.", "-"], required: true },
    value: { type: Number, required: false },
  }
});

module.exports = mongoose.model("Products", productSchema);
