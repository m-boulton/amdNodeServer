const AmdDatabaseConnection = require("./../database/mongodbAmd");
const AmdNavSchema = require("./../schemas/amdNavSchema");

// Attaching the model with imported schema to db connection
const AmdNavModel = AmdDatabaseConnection.model("AmdNav", AmdNavSchema);
module.exports = AmdNavModel;
