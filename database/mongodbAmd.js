// Loading Environment Variables
require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
const mongoose = require("mongoose");
const { AMD_DB_CONNECT: amdDatabase } = process.env;

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

const amdContentModel = AmdDatabaseConnection.model(
  "AmdContent",
  require("../schemas/amd/amdContentSchema")
);
const amdNavModel = AmdDatabaseConnection.model(
  "AmdNav",
  require("../schemas/amd/amdNavSchema")
);
const amdSpecItemModel = AmdDatabaseConnection.model(
  "AmdSpecItem",
  require("../schemas/amd/amdSpecItemSchema")
);
const amdSpecListModel = AmdDatabaseConnection.model(
  "AmdSpecList",
  require("../schemas/amd/amdSpecListSchema")
);

module.exports = {
  amdContentModel,
  amdNavModel,
  amdSpecItemModel,
  amdSpecListModel,
};
