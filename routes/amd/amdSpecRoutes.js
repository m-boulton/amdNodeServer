const express = require("express");
const router = express.Router();
const AmdSpec = require("../../models/amd/amdSpecModel");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
  auth,
} = require("../../functions/amd/amdFunctions");

// Routing for amd spec data ------------------------------------------------- Spec Routing

router
  .route("/")

  // get request for amd spec data

  .get(async (req, res) => {
    try {
      const posts = await AmdSpec.find();
      res.json(posts);
      console.log("Data requested for the amdDB specs");
    } catch (err) {
      res.json({
        message: "There was an error getting amd spec's",
        error: err,
      });
    }
  })

  // posts made to amd spec database

  .post(auth, async (req, res) => {
    const post = new AmdSpec({
      title: req.body.payload.title,
      spec: req.body.payload.spec,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`Posted to amdDB spec with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "There was an error posting amd spec's",
        message: err,
      });
    }
  })

  // updates to amd spec data on database

  .put(auth, async (req, res) => {
    const updatedPost = new AmdSpec({
      title: req.body.payload.title,
      spec: req.body.payload.spec,
    });
    try {
      const savedPost = await updatedPost.save();
      res.json(savedPost);
      console.log(`Updated posts to amdDB spec with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "There was an error putting amd spec's",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
