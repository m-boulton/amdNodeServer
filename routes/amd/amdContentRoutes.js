const express = require("express");
const router = express.Router();
const AmdContent = require("../../models/amd/amdContentModel");
const { auth } = require("../../functions/amd/amdFunctions");

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      // req.body.getById
      const get = await AmdContent.findOne({ target: req.query.target });
      res.json({
        message: "Data",
        data: get,
      });
      console.log(
        `Data requested for the amdDB content -- ${get.target}`,
        Date()
      );
    } catch (err) {
      res.json({
        message: "error",
        error: "There was an error getting amdDB content",
        errorData: err,
      });
    }
  })

  // posts made to amd content database

  .post(auth, async (req, res) => {
    const post = new AmdContent({
      target: req.body.payload.target,
      insertId: req.body.payload.insertId,
      content: req.body.payload.content,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`Posted to amdDB content ${post.target} on the database`);
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
      target: req.body.payload.target,
      insertId: req.body.payload.insertId,
      content: req.body.payload.content,
    };
    try {
      await AmdContent.updateOne({ target: req.body.payload.target }, putObj);
      // responding to the client and logging the updated
      res.json(putObj);
      console.log(`Updated Amd content ${putObj.target} on the database`);
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
