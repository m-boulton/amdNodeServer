const express = require("express");
const router = express.Router();
const AmdContent = require("../../models/amd/amdModelContent");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
} = require("../../functions/amd/amdFunctions");

// Check for authentication
const auth = (req, res, next) => {
  if (req.body.auth) {
    next();
  } else {
    console.log(
      `Posting priveleges have been denied by ${JSON.stringify(
        req.headers.host
      )}`
    );
    res.json({ message: "Incorrect Password" });
  }
};

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      // req.body.getById
      const get = await AmdContent.find();
      res.json({
        message: `This is the Amd Content for -- ${get[0].title}`,
        returnData: get,
      });
      console.log(`Data requested for the amdDB content -- ${get[0].title}`);
    } catch (err) {
      res.json({
        message: "there was an error getting amd content",
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
        message: `Data saved to Amd Content ${post.title}`,
      });
      console.log(`Data Posted to Amd Content ${post.title}`);
    } catch (err) {
      res.json({
        type: "there was an error posting amd content",
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
      console.log(`updated posts to content DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error putting amd content",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
