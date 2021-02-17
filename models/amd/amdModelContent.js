const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const AmdContent = mongoose.Schema({
  title: reqString,
  spec: Object,
});
module.exports = mongoose.model("AmdContent", AmdContent);
