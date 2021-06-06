const AmdDatabaseConnection = require("./../database/mongodbAmd");
const AmdSpecItemSchema = require("./../schemas/amdSpecItemSchema");

// Attaching the model with imported schema to db connection
const AmdSpecItemModel = AmdDatabaseConnection.model(
  "AmdSpecItem",
  AmdSpecItemSchema
);
module.exports = AmdSpecItemModel;
