require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
const messageBuilder = require("./messageBuilder");
const emailTransporter = require("./emailTransporter");
const formValidate = require("./contactValidate");

// send mail with defined transport object
async function sendEmail(initial) {
  try {
    // checks the message data to make sure required fields are declared
    const validMessage = await formValidate(initial);
    if (validMessage !== true) throw validMessage;
    // building email options with passed data
    const mailOptions = await messageBuilder(initial);
    // building email transporter
    const transporter = await emailTransporter();

    //   sending mail with built data
    let res = await transporter.sendMail(mailOptions);
    if (typeof res.accepted[0] === "string")
      return { message: "SUCCESS", data: `Email sent: ${res.response}` };
    if (typeof res.rejected[0] === "string") throw res.rejected;
  } catch (err) {
    return { message: "ERROR", error: err };
  }
}

module.exports = sendEmail;
