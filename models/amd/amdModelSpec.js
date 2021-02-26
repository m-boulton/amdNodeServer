const mongoose = require("mongoose");
const amdModelContent = require("./amdModelContent");

const reqString = {
  type: String,
  required: true,
};
const AmdSpecItems = mongoose.Schema({
  title: reqString,
  spec: Object,
});
const AmdSpec = mongoose.Schema({
  specs: [AmdSpecItems],
});
module.exports = mongoose.model("AmdSpec", AmdSpec);
