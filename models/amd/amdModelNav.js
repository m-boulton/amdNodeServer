const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const AmdNav = mongoose.Schema({
  title: reqString,
  spec: Object,
});
module.exports = mongoose.model("AmdNav", AmdNav);
