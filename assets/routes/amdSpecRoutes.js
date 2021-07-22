const express = require("express");
const router = express.Router();
const AmdSpecItemModel = require("./../models/amdSpecItemModel");
const AmdSpecListModel = require("./../models/amdSpecListModel");
const { auth } = require("../functions/amdFunctions");

// Routing for amd spec data ------------------------------------------------- Spec Routing

router
  .route("/")

  .get(async (req, res) => {
    let reqSchema = null;
    try {
      if (req.query.location == null || req.query.target == null) {
        return res.json({
          message: "Error",
          error: `Queries missing for location : ${req.query.location} or Target ${req.query.location}`,
        });
      }
      // declaring the schema based on location query
      if (req.query.location == "list") {
        reqSchema = AmdSpecListModel;
      }
      if (req.query.location == "item") {
        reqSchema = AmdSpecItemModel;
      }
      let get = await reqSchema.findOne({ target: req.query.target });
      if (get == null) {
        return res.json({
          message: "Empty",
          error: "Item does not exist on the database",
        });
      }
      res.json({
        message: "Data",
        data: get,
      });
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error getting amdDB spec",
        errorData: err,
      });
    }
  })

  // posts made to amd spec database

  .post(auth, async (req, res) => {
    let post = null;
    let response = null;
    if (req.query.location == "list") {
      post = new AmdSpecListModel({
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        models: req.body.payload.models,
      });
      response = "List Saved";
    }
    if (req.query.location == "item") {
      post = new AmdSpecItemModel({
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        items: req.body.payload.items,
      });
      response = "Item Saved";
    }
    if (req.query.location == null) {
      response = "Location query not Declared";
    }
    try {
      if (post == null) {
        res.json(response);
        return console.log("Failed attempt to save to Amd Specs");
      }
      await post.save();
      res.json(response);
    } catch (err) {
      res.json({
        type: "There was an error posting amd spec's",
        message: err,
      });
    }
  })

  // updates to amd spec data on database

  .put(auth, async (req, res) => {
    let putObj = null;
    let reqSchema = null;
    if (req.query.location == "list") {
      reqSchema = AmdSpecListModel;
      putObj = {
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        models: req.body.payload.models,
      };
    }
    if (req.query.location == "item") {
      reqSchema = AmdSpecItemModel;
      putObj = {
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        items: req.body.payload.items,
      };
    }
    try {
      await reqSchema.updateOne({ target: putObj.target }, putObj);
      res.json(
        `Updated data to ${putObj.target} in the amd spec ${req.query.location}`
      );
      console.log(`Updated posts to amdDB spec with ${putObj.target}`);
    } catch (err) {
      res.json({
        type: "There was an error putting amd spec's",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
