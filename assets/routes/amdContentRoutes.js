const express = require("express");
const router = express.Router();
const AmdContentModel = require("./../models/amdContentModel");
const { auth } = require("./../functions/amdFunctions");

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      if (req.query.p == null) {
        return res.json({
          message: "ERROR",
          error: "product query is empty.",
        });
      }
      // req.body.getById
      const get = await AmdContentModel.findOne({ product: req.query.p });
      if (get === null)
        throw `Database item check has failed for ${req.query.p}`;
      res.json({
        message: "DATA",
        data: get,
      });
    } catch (err) {
      res.json({
        message: "ERROR",
        error: `There was an error getting amdDB content ${req.query.p}`,
        errorData: err,
      });
    }
  })

  // posts made to amd content database

  .post(auth, async (req, res) => {
    const post = new AmdContentModel({
      product: req.body.payload.product,
      insertId: req.body.payload.insertId,
      background: req.body.payload.background,
      content: req.body.payload.content,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`Posted to amdDB content ${post.product} on the database`);
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error posting to amd content",
        errorData: err,
      });
    }
  })

  // updates to amd content data on database

  .put(auth, async (req, res) => {
    // Building the updated changes
    const putObj = {
      product: req.body.payload.product,
      insertId: req.body.payload.insertId,
      background: req.body.payload.background,
      content: req.body.payload.content,
    };
    try {
      await AmdContentModel.updateOne(
        { product: req.body.payload.product },
        putObj
      );
      // responding to the client and logging the updated
      res.json(putObj);
      console.log(`Updated Amd content ${putObj.product} on the database`);
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error updating to amd Content",
        errorData: err,
      });
      console.log(err);
    }
  });

module.exports = router;
