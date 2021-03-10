const express = require("express");
const router = express.Router();
const AmdSpec = require("../../models/amd/amdModelSpec");
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

// Routing for amd spec data ------------------------------------------------- Spec Routing

router
  .route("/")

  // get request for amd spec data

  .get(async (req, res) => {
    try {
      const posts = await AmdSpec.find();
      res.json(posts);
      console.log("data requested for the amdDB specs");
    } catch (err) {
      res.json({
        message: "there was an error getting amd spec's",
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
      console.log(`posted to spec DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error posting amd spec's",
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
      console.log(`updated posts to spec DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error putting amd spec's",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
