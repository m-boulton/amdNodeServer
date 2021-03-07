const mongoose = require("mongoose");
const { Schema } = mongoose;

const reqString = {
  type: String,
  required: true,
};
const Products = new Schema({
  prodLink: String,
  prodTitle: String,
  class: String,
});
const NavList = new Schema({
  navLink: String,
  navTitle: String,
  class: String,
  childClass: String,
  onclick: String,
  navigationInclude: Boolean,
  list: [Products],
});
const AmdNav = new Schema(
  {
    navigation: Boolean,
    navList: [NavList],
    version: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdNav", AmdNav);
