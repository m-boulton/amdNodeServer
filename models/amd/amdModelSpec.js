const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const AmdSpec = mongoose.Schema({
  title: reqString,
  spec: Object,
});
module.exports = mongoose.model("AmdSpec", AmdSpec);
