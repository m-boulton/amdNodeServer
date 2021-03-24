const express = require("express");
const router = express.Router();
const AmdNav = require("../../models/amd/amdNavModel");
const {
  amdNavVersionCheck,
  amdNavVersionUpdate,
  auth,
} = require("../../functions/amd/amdFunctions");

// Routing for amd nav data -------------------------------------------------- Nav Routing

router
  .route("/")

  // get request for amd nav data

  .get(async (req, res) => {
    try {
      if (typeof req.query.v == "string") {
        const getUpdate = await AmdNav.findOne({ primary: true });
        if (getUpdate.version == req.query.v) {
          res.json({ message: "Updated" });
        } else {
          res.json({ message: "New Update", data: getUpdate });
        }
      } else {
        const get = await AmdNav.findOne({ primary: true });
        res.json({ message: "Initial Update", data: get });
        console.log("Data requested for the amdDB Nav");
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
    const post = new AmdNav({
      primary: req.body.payload.primary,
      navList: req.body.payload.navList,
      version: req.body.payload.version,
    });
    try {
      const savedPost = await post.save();
      res.json(savedPost);
      console.log("Posted to amdDB nav on the database");
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
    // checking current version
    let versionCurrent = await amdNavVersionCheck();
    let versionUpdate = await amdNavVersionUpdate();
    // Building the updated changes
    const put = {
      primary: req.body.payload.primary,
      navList: req.body.payload.navList,
      version: versionUpdate,
    };
    try {
      await AmdNav.updateOne({ primary: true }, put);
      // responding to the client and logging the updated
      res.json(put);
      console.log(`Updated Amd nav on the database to version: ${put.version}`);
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
