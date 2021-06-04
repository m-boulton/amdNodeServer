require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
let nodemailer = require("nodemailer");
const {
  EMAIL_ADMIN: emailAdmin,
  EMAIL_HOST: emailHost,
  EMAIL_USER: emailUser,
  EMAIL_PASS: emailPass,
} = process.env;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: `${emailHost}`,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: `${emailUser}`,
    pass: `${emailPass}`,
  },
  tls: { rejectUnauthorized: false },
});

// send mail with defined transport object
async function sendEmail(data) {
  // building email options with passed data
  const mailOptions = {
    from: `"Mboulton Services" <${emailUser}>`, // sender address
    to: data.emailMe ? `${emailAdmin}, ${data.email}` : `${emailAdmin}`, // list of receivers

    subject: `[Form Submitted to Mboulton.com] ${data.subject}`, // Subject line
    text: `${data.message}`, // plaintext body
    // html: "<b>Insert Relevant Html Message Here</b>", // html body
  };

  console.log(mailOptions);
  //   sending mail with built data
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
}

module.exports = sendEmail;
