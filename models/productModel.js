const mongoose = require("module");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: int,
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
});

module.exports = mongoose.model("Products", productSchema);
