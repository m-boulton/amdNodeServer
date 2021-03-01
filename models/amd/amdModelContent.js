const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};
const Overview = mongoose.Schema({
  overviewHeader: String,
  overviewParagraph: String,
  overviewImage: String,
});
const Features = mongoose.Schema({
  title: String,
  paragraph: String,
  image: String,
});
const Content = mongoose.Schema({
  overview: [Overview],
  features: [Features],
  models: Array,
});
const AmdContent = mongoose.Schema(
  {
    link: reqString,
    title: reqString,
    content: [Content],
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdContent", AmdContent);
