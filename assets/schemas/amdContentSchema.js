const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const AmdContentSchema = new Schema(
  {
    product: reqString,
    insertId: reqString,
    background: String,
    content: Object,
  },
  { timestamps: true }
);
module.exports = AmdContentSchema;
