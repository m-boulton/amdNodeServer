// Dependancies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const { amdNavVersionCheck } = require("./functions/amd/amdFunctions");

// Loading Environment Variables
if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `/var/www/env/.env.${process.env.NODE_ENV}`,
  });
  console.log("*** Using Production Environment Variables ***");
} else {
  require("dotenv").config();
  console.log("*** Using Developer Environment Variables ***");
}

// DotEnv Variables
const {
  AMD_DB_CONNECT: amdDatabase,
  DEV_URL: devUrl,
  PORT: port,
  POST_CRED: postPassword,
} = process.env;

// Connect to database -------------------------------------------------------------------------------
mongoose.connect(
  amdDatabase,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("*** Connected to AmdDB ***");
    // Version check and print for database collections
  }
);

// Middleware ---------------------------------------------------------------------------------------
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", devUrl || "mboulton.com");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// Checks the request body for the password so that you can post to the database
app.use((req, res, next) => {
  req.body.auth = false;
  req.body.password === postPassword
    ? (req.body.auth = true)
    : (req.body.auth = false);
  next();
});

// Import Routes
const amdRoutes = require("./routes/amd/amdRoutes");
// const cloudRoutes = require("./routes/cloud/cloudRoutes");

// Routes --------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({ message: `this is the root api` });
});
// app.get("/test", (req, res) => {
//   console.log("test endpoint ", req.body);
// });
app.use("/amd", amdRoutes);
// app.use("/cloud", cloudRoutes);

// Port Listeners -----------------------------------------------------------------------------------
app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR ", err);
  }
  console.log(`*** Listening on port ${port} ***`);
});
