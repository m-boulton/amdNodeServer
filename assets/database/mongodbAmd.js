// Loading Environment Variables
require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
const mongoose = require("mongoose");
const { AMD_DB_CONNECT: amdDatabase } = process.env;
const AmdContentSchema = require("./../schemas/amdContentSchema");
const AmdNavSchema = require("./../schemas/amdNavSchema");
const AmdSpecItemSchema = require("./../schemas/amdSpecItemSchema");
const AmdSpecListSchema = require("./../schemas/amdSpecListSchema");

// Connect to the AMD database -------------------------------------------------------------------------------
const AmdDatabaseConnection = mongoose.createConnection(amdDatabase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

AmdDatabaseConnection.on("connected", () => {
  console.log("* * Connected to AMD Database * *");
});

AmdDatabaseConnection.on("disconnected", () => {
  console.log("* * Disconnected from AMD Database * *");
});

AmdDatabaseConnection.on("error", (error) => {
  console.log(error.message);
});

process.on("SIGINT", async () => {
  await AmdDatabaseConnection.close();
  process.exit(0);
});

// Attaching the model with imported schema to db connection
const AmdContentModel = AmdDatabaseConnection.model(
  "AmdContent",
  AmdContentSchema
);
const AmdNavModel = AmdDatabaseConnection.model("AmdNav", AmdNavSchema);
const AmdSpecItemModel = AmdDatabaseConnection.model(
  "AmdSpecItem",
  AmdSpecItemSchema
);
const AmdSpecListModel = AmdDatabaseConnection.model(
  "AmdSpecList",
  AmdSpecListSchema
);
module.exports = {
  AmdContentModel,
  AmdNavModel,
  AmdSpecItemModel,
  AmdSpecListModel,
};
