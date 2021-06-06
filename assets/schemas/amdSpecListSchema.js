const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

// Main schema design
const AmdSpecListSchema = new Schema(
  { target: reqString, insertId: reqString, models: Array },
  { timestamps: true }
);

// exporting schemas to the model method
module.exports = AmdSpecListSchema;
