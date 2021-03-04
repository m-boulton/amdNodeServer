const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};

// child of AmdSpec schema
const AmdSpecItems = new Schema({
  title: reqString,
  spec: Object,
});

// Main schema design
const AmdSpec = new Schema(
  {
    specs: [AmdSpecItems],
  },
  { timestamps: true }
);

// exporting schemas to the model method
module.exports = mongoose.model("AmdSpec", AmdSpec);
