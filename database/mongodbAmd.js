// Loading Environment Variables
require("dotenv").config({ path: `/var/www/env/.env` });
require("dotenv").config();
const mongoose = require("mongoose");
const { AMD_DB_CONNECT: amdDatabase } = process.env;

// Connect to the AMD database -------------------------------------------------------------------------------
const AmdMongoose = mongoose.createConnection(amdDatabase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const amdContentModel = AmdMongoose.model(
  "AmdContent",
  require("../schemas/amd/amdContentSchema")
);
const amdNavModel = AmdMongoose.model(
  "AmdNav",
  require("../schemas/amd/amdNavSchema")
);
const amdSpecItemModel = AmdMongoose.model(
  "AmdSpecItem",
  require("../schemas/amd/amdSpecItemSchema")
);
const amdSpecListModel = AmdMongoose.model(
  "AmdSpecList",
  require("../schemas/amd/amdSpecListSchema")
);

mongoose.connection.on("connected", () => {
  console.log("* * Connected to AMD Database * *");
});

mongoose.connection.on("disconnected", () => {
  console.log("* * Disconnected from AMD Database * *");
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = {
  amdContentModel,
  amdNavModel,
  amdSpecItemModel,
  amdSpecListModel,
};
