const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const Overview = new Schema({
  overviewHeader: String,
  overviewParagraph: String,
  overviewImage: String,
});
const Features = new Schema({
  title: String,
  paragraph: String,
  image: String,
});
const Content = new Schema({
  overview: [Overview],
  features: [Features],
  models: Array,
});
const AmdContent = new Schema(
  {
    link: reqString,
    title: reqString,
    content: [Content],
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdContent", AmdContent);
