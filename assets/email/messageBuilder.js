require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
const { EMAIL_ROUTE: emailRoute, EMAIL_USER: emailUser } = process.env;

function messageBuilder(data) {
  return {
    from: `"Mboulton Services" <${emailUser}>`,
    to: `${emailRoute}`,
    subject: `[Form Submitted to AMD Project on Mboulton.com] ${data.subject}`,
    text: `${data.message}`, // plaintext body
    // html: "<b>Insert Relevant Html Message Here</b>", // html body
  };
}

module.exports = messageBuilder;
