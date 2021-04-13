const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const AmdContent = new Schema(
  {
    target: reqString,
    insertId: reqString,
    content: Object,
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdContent", AmdContent);
