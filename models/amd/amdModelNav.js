const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const Products = new Schema({
  link: String,
  title: String,
  class: String,
});
const NavList = new Schema({
  link: String,
  title: String,
  class: String,
  childClass: String,
  onclick: String,
  navigationInclude: Boolean,
  list: [Products],
});
const AmdNav = new Schema(
  {
    primary: Boolean,
    navList: [NavList],
    version: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdNav", AmdNav);
