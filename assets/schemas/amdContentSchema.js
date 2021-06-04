const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const AmdContent = new Schema(
  {
    product: reqString,
    insertId: reqString,
    content: Object,
  },
  { timestamps: true }
);
module.exports = AmdContent;
