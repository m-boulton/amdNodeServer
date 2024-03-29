const express = require("express");
const router = express.Router();
const AmdNavModel = require("./../models/amdNavModel");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
  auth,
} = require("../functions/amdFunctions");

// Routing for amd nav data -------------------------------------------------- Nav Routing

router
  .route("/")

  // get request for amd nav data

  .get(async (req, res) => {
    try {
      if (typeof req.query.version == "string") {
        const getUpdate = await AmdNavModel.findOne({
          target: req.query.target,
        });
        if (getUpdate.version == req.query.version) {
          res.json({ message: "Updated" });
        } else {
          res.json({ message: "Data", data: getUpdate });
        }
      } else {
        const get = await AmdNavModel.findOne({ target: req.query.target });
        res.json({ message: "Data", data: get });
      }
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error getting amd nav",
        errorData: err,
      });
    }
  })

  // posts made to amd nav database

  .post(auth, async (req, res) => {
    const post = new AmdNavModel({
      target: req.body.payload.target,
      insertId: req.body.payload.insertId,
      content: req.body.payload.content,
      version: req.body.payload.version,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`Posted to amdDB nav ${post.target} on the database`);
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error posting to amd nav",
        errorData: err,
      });
    }
  })

  // updates to amd nav data on database

  .put(auth, async (req, res) => {
    let versionUpdate = await amdNavVersionUpdate(req.body.payload.target);
    // Building the updated changes
    const putObj = {
      target: req.body.payload.target,
      insertId: req.body.payload.insertId,
      content: req.body.payload.content,
      version: versionUpdate,
    };
    try {
      await AmdNavModel.updateOne({ target: req.body.payload.target }, putObj);
      // responding to the client and logging the updated
      res.json(putObj);
      console.log(
        `Updated Amd nav ${putObj.target} on the database to version: ${putObj.version}`
      );
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error updating to amd nav",
        errorData: err,
      });
      console.log(err);
    }
  });
module.exports = router;
