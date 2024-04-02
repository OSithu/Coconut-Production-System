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

  Date: {
    type: Date,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },

});

//passing two parameters (name of database table, schema)
module.exports = mongoose.model("ProductCnt", productCntSchema);
