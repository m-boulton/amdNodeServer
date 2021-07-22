const AmdDatabaseConnection = require("./../database/mongodbAmd");
const contactFormSchema = require("./../schemas/amdContactFormSchema");

// Attaching the model with imported schema to db connection
const contactFormModel = AmdDatabaseConnection.model(
  "ContactForms",
  contactFormSchema
);

// Exporting model for use in routing
module.exports = contactFormModel;
