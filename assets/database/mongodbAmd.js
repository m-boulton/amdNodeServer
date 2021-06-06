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

module.exports = AmdDatabaseConnection;
