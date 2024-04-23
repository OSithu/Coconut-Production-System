const mongoose = require("mongoose");

//Create Models
const pestRecordSchema = new mongoose.Schema({
  treeID: {
    type: String,
    required: true,
  },
  pestDate: {
    type: Date,
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
});

//model export
module.exports = mongoose.model("Pest_Add_Records", pestRecordSchema);
