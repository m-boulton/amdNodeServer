const express = require("express");
const router = express.Router();
const AmdNav = require("../../models/amd/amdModelNav");
const AmdContent = require("../../models/amd/amdModelContent");
const AmdSpec = require("../../models/amd/amdModelSpec");
// const amdFunc = require("../functions/amdFunctions");

// Routing for amd nav data -------------------------------------------------- Nav Routing

router
  .route("/nav")

  // get request for amd nav data

  .get(async (req, res) => {
    try {
      const posts = await AmdNav.find();
      res.json(posts);
      console.log("data requested for the amdDB navs");
    } catch (err) {
      res.json({ message: "there was an error", error: err });
    }
  })

  // posts made to amd nav database

  .post(async (req, res) => {
    const post = new AmdNav({
      title: req.body.title,
      nav: req.body.nav,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`posted to nav DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  })

  // updates to amd nav data on database

  .put(async (req, res) => {
    const updatedPost = new AmdNav({
      title: req.body.title,
      nav: req.body.nav,
    });
    try {
      const savedPost = await updatedPost.save();
      res.json(savedPost);
      console.log(`updated posts to nav DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  });

// Routing for amd content data ----------------------------------------------- Content Routing

router
  .route("/content")

  // get request for amd content data

  .get(async (req, res) => {
    try {
      const posts = await AmdContent.find();
      res.json(posts);
      console.log("data requested for the amdDB contents");
    } catch (err) {
      res.json({ message: "there was an error", error: err });
    }
  })

  // posts made to amd content database

  .post(async (req, res) => {
    const post = new AmdContent({
      title: req.body.title,
      content: req.body.content,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`posted to content DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  })

  // updates to amd content data on database

  .put(async (req, res) => {
    const updatedPost = new AmdContent({
      title: req.body.title,
      content: req.body.content,
    });
    try {
      const savedPost = await updatedPost.save();
      res.json(savedPost);
      console.log(`updated posts to content DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  });

// Routing for amd spec data ------------------------------------------------- Spec Routing

router
  .route("/spec")

  // get request for amd spec data

  .get(async (req, res) => {
    try {
      const posts = await AmdSpec.find();
      res.json(posts);
      console.log("data requested for the amdDB specs");
    } catch (err) {
      res.json({ message: "there was an error", error: err });
    }
  })

  // posts made to amd spec database

  .post(async (req, res) => {
    const post = new AmdSpec({
      title: req.body.title,
      spec: req.body.spec,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log(`posted to spec DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  })

  // updates to amd spec data on database

  .put(async (req, res) => {
    const updatedPost = new AmdSpec({
      title: req.body.title,
      spec: req.body.spec,
    });
    try {
      const savedPost = await updatedPost.save();
      res.json(savedPost);
      console.log(`updated posts to spec DB with ${req.body.title}`);
    } catch (err) {
      res.json({
        type: "there was an error",
        message: err,
      });
      console.log(err);
    }
  });

module.exports = router;
