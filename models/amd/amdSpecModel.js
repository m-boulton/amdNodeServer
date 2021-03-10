const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

// Main schema design
const AmdSpec = new Schema(
  { title: reqString, spec: Object },
  { timestamps: true }
);

// exporting schemas to the model method
module.exports = mongoose.model("AmdSpec", AmdSpec);
