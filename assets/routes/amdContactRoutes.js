const express = require("express");
const router = express.Router();
const sendEmail = require("./../email/contactMailer");
const contactFormPost = require("./../database/contactFormPost");

// Routing for Portfolio contact forms---------------------

router.route("/").post(async (req, res) => {
  try {
    // sends the form to get emailed
    const emailResponse = await sendEmail(req.body);
    // sends the form to get saved to database if the email succeeds
    if (emailResponse.message === "SUCCESS") {
      const databaseResponse = await contactFormPost(req.body);
      // responds to the client when the form is saved to the database
      return res.json(databaseResponse);
    }
    // if email returns an error or if database fails responds to client
    return res.json(emailResponse);
  } catch (err) {
    res.json({ message: "this error was thrown", error: err });
  }
});

module.exports = router;
