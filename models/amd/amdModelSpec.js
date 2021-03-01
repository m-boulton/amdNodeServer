const mongoose = require("mongoose");
const amdModelContent = require("./amdModelContent");

const reqString = {
  type: String,
  required: true,
};

// child of AmdSpec schema
const AmdSpecItems = mongoose.Schema({
  title: reqString,
  spec: Object,
});

// Main schema design
const AmdSpec = mongoose.Schema({
  specs: [AmdSpecItems],
});

// exporting schemas to the model method
module.exports = mongoose.model("AmdSpec", AmdSpec);
