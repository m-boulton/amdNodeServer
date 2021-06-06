const AmdDatabaseConnection = require("./../database/mongodbAmd");
const AmdContentSchema = require("./../schemas/amdContentSchema");

// Attaching the model with imported schema to db connection
const AmdContentModel = AmdDatabaseConnection.model(
  "AmdContent",
  AmdContentSchema
);
module.exports = AmdContentModel;
