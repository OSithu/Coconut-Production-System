const mongoose = require("mongoose");

//Create Models
const pesticidesSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true,
  },
  pestName: {
    type: String,
    required: true,
  },
  pestType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  guidelines: {
    type: String,
    required: true,
  },
  precautions: {
    type: String,
    required: true,
  },
});

//model export
module.exports = mongoose.model("Pestcides", pesticidesSchema);
