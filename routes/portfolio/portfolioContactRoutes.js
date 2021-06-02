const express = require("express");
const router = express.Router();
const sendEmail = require("../../email/portfolio/contactMailer");
const ContactModel = require("../../models/portfolio/contactModel");

// Routing for Portfolio contact forms---------------------

router
  .route("/")

  .post(async (req, res) => {
    const data = req.body;
    sendEmail(data);

    // responds back to the client that form has been submitted correctly
    res.json({ message: "Success", data: "Form has been submitted." });
  });

module.exports = router;

// post fetch obj
// {
//   name: 'mike',
//   email: 'mike@gmail.com',
//   subject: 'hello again',
//   message: 'this is a message',
//   emailMe: true,
//   auth: false
// }
