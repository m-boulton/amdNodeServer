const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const AmdNav = new Schema(
  {
    target: reqString,
    content: Array,
    version: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdNav", AmdNav);
