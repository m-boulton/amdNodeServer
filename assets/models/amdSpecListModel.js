const AmdDatabaseConnection = require("./../database/mongodbAmd");
const AmdSpecListSchema = require("./../schemas/amdSpecListSchema");

// Attaching the model with imported schema to db connection
const AmdSpecListModel = AmdDatabaseConnection.model(
  "AmdSpecList",
  AmdSpecListSchema
);
module.exports = AmdSpecListModel;
