const express = require("express");
const router = express.Router();
const { amdContentModel } = require("../../database/mongodbAmd");
const { auth } = require("../../functions/amd/amdFunctions");

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      if (req.query.p == null) {
        return res.json({
          message: "error",
          error: "product query is empty.",
        });
      }
      // req.body.getById
      const get = await amdContentModel.findOne({ product: req.query.p });
      res.json({
        message: "Data",
        data: get,
      });
      console.log(
        `Data requested for the amdDB content -- ${get.product}`,
        Date()
      );
    } catch (err) {
      res.json({
        message: "error",
        error: `There was an error getting amdDB content ${req.query.p}`,
        errorData: err,
      });
    }
  })

  // posts made to amd content database

  .post(auth, async (req, res) => {
    const post = new amdContentModel({
      product: req.body.payload.product,
      insertId: req.body.payload.insertId,
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
      content: req.body.payload.content,
    };
    try {
      await amdContentModel.updateOne(
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
