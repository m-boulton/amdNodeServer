const contactFormModel = require("./../models/amdContactFormModel");

async function contactFormsPost(data) {
  const post = new contactFormModel({
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  });
  try {
    await post.save();
    return { message: "SUCCESS", data: "Form Submitted Successfully." };
  } catch (err) {
    return { message: "ERROR", error: err };
  }
}
module.exports = contactFormsPost;
