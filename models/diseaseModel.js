const mongoose = require("mongoose");

//Create Models
const diseaseSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: true,
  },
  diseaseType: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  preventiveMeasures: {
    type: String,
    required: true,
  },
  stages: {
    type: String,
    required: true,
  },
  specialnotes: {
    type: String,
    required: true,
  },
});

//model export
module.exports = mongoose.model("Disease", diseaseSchema);
