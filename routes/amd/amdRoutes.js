const express = require("express");
const router = express.Router();
const AmdNav = require("../../models/amd/amdModelNav");
const AmdContent = require("../../models/amd/amdModelContent");
const AmdSpec = require("../../models/amd/amdModelSpec");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
} = require("../../functions/amd/amdFunctions");

// Routing for amd nav data -------------------------------------------------- Nav Routing

router
  .route("/nav")

  // get request for amd nav data

  .get(async (req, res) => {
    try {
      const get = await AmdNav.find();
      res.json(get);
      console.log("data requested for the amdDB navs");
    } catch (err) {
      res.json({ message: "there was an error", error: err });
    }
  })

  // posts made to amd nav database

  .post(async (req, res) => {
    const post = new AmdNav({
      navList: req.body.payload.navList,
      version: req.body.payload.version,
    });
    try {
      // Checking for authroization to change the database
      if (req.body.auth === false) {
        res.json({ message: "Password Incorrect" });
      } else {
        const savedPost = await post.save();
        res.json(savedPost);
        console.log("posted to Amd nav on the database");
      }
    } catch (err) {
      res.json({
        type: "Error posting to the Database",
        message: err,
      });
    }
  })

  // updates to amd nav data on database

  .put(async (req, res) => {
    let versionCurrent = await amdNavVersionCheck();
    let versionUpdate = await amdNavVersionUpdate();
    const put = {
      navList: req.body.payload.navList,
      version: versionUpdate,
    };
    try {
      // Checking for authroization to change the database
      if (req.body.auth === false) {
        res.json({ message: "Password Incorrect" });
      } else {
        await AmdNav.updateOne({ version: versionCurrent }, put);
        // const savedPost = await post.save();
        // responding to the client and logging the updated
        res.json(put);
        console.log("Updated Amd nav on the database");
        amdNavVersionCheck(true);
      }
    } catch (err) {
      res.json({
        type: "Error posting to the Database",
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
      link: req.body.payload.link,
      title: req.body.payload.title,
      content: req.body.payload.content,
    });
    try {
      if (req.body.auth === false) {
        res.json({ message: "Password Incorrect" });
      } else {
        const savedPost = await post.save();
        res.json({ message: "Data saved", saved: savedPost });
        console.log("Data Posted to Amd Content");
      }
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