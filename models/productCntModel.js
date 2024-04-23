const mongoose = require("mongoose");

const productCntSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  quantityUnit: {
    type: String,
    required: false,
  },

  productDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

//passing two parameters (name of database table, schema)
module.exports = mongoose.model("ProductCnt", productCntSchema);
