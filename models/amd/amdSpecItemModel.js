const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

// Main schema design
const AmdSpecItem = new Schema(
  { taget: reqString, insertId: reqString, modelId: reqString, items: Array },
  { timestamps: true }
);

// exporting schemas to the model method
module.exports = mongoose.model("AmdSpecItem", AmdSpecItem);
