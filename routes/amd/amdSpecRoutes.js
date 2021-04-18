const express = require("express");
const router = express.Router();
const AmdSpecList = require("../../models/amd/amdSpecListModel");
const AmdSpecItem = require("../../models/amd/amdSpecItemModel");
const { auth } = require("../../functions/amd/amdFunctions");
const amdSpecItemModel = require("../../models/amd/amdSpecItemModel");

// Routing for amd spec data ------------------------------------------------- Spec Routing

router
  .route("/")

  // get request for amd spec data

  .get(async (req, res) => {
    let get = null;
    try {
      if (req.query.location == "list") {
        get = await AmdSpecList.findOne({ target: req.query.target });
      }
      if (req.query.location == "item") {
        get = await AmdSpecList.findOne({ target: req.query.target });
      }
      if (req.query.location == null) {
        get = "Item does not exist on the database";
      }
      // req.body.getById
      res.json({
        message: "Data",
        data: get,
      });
      console.log(`Data requested for the amdDB spec -- ${get.target}`, Date());
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
      post = new AmdSpecList({
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        models: req.body.payload.models,
      });
      response = "List Saved";
    }
    if (req.query.location == "item") {
      post = new AmdSpecItem({
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        modelId: req.body.payload.modelId,
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
    let schema = null;
    if (req.query.location == "list") {
      schema = AmdSpecList;
      putObj = {
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        models: req.body.payload.models,
      };
    }
    if (req.query.location == "item") {
      schema = AmdSpecItem;
      putObj = {
        target: req.body.payload.target,
        insertId: req.body.payload.insertId,
        modelId: req.body.payload.modelId,
        items: req.body.payload.items,
      };
    }
    try {
      await schema.updateOne({ target: req.query.target }, putObj);
      res.json(
        `Updated data to ${req.query.target} in the amd spec ${req.query.location}`
      );
      console.log(`Updated posts to amdDB spec with ${req.query.target}`);
    } catch (err) {
      res.json({
        type: "There was an error putting amd spec's",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
