const express = require("express");
const router = express.Router();
const AmdContent = require("../../models/amd/amdContentModel");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
  auth,
} = require("../../functions/amd/amdFunctions");

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/:productId")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      // req.body.getById
      const get = await AmdContent.find({ title: req.params.productID });
      res.json({
        message: `This is the Amd Content for -- ${get[0].title}`,
        returnData: get,
      });
      console.log(`Data requested for the amdDB content -- ${get[0].title}`);
    } catch (err) {
      res.json({
        message: "There was an error getting amdDB content",
        error: err,
      });
    }
  })

  // posts made to amd content database

  .post(auth, async (req, res) => {
    const post = new AmdContent({
      link: req.body.payload.link,
      title: req.body.payload.title,
      content: req.body.payload.content,
      overview: req.body.payload.content.overview,
      features: req.body.payload.content.features,
      models: req.body.payload.content.models,
    });
    try {
      const savedPost = await post.save();
      res.json({
        message: `Data posted to Amd Content ${post.title}`,
      });
      console.log(`Data posted to Amd Content ${post.title}`);
    } catch (err) {
      res.json({
        type: "There was an error posting amd content",
        message: err,
      });
      console.log(err);
    }
  })

  // updates to amd content data on database

  .put(auth, async (req, res) => {
    const updatedPost = new AmdContent({
      link: req.body.payload.link,
      title: req.body.payload.title,
      content: req.body.payload.content,
    });
    try {
      const savedPost = await updatedPost.save();
      res.json(savedPost);
      console.log(`Updated posts to amdDB content with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "There was an error putting amd content",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
