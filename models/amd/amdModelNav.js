const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};
const Products = mongoose.Schema({
  link: reqString,
  title: reqString,
  class: String,
});
const NavList = mongoose.Schema({
  link: String,
  title: reqString,
  class: String,
  childClass: String,
  onclick: String,
  navigationInclude: Boolean,
  list: [Products],
});
const AmdNav = mongoose.Schema(
  {
    navList: [NavList],
    version: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("AmdNav", AmdNav);
