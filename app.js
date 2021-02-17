// Dependancies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// DotEnv Variables
const amdDatabase = process.env.AMD_DB_CONNECT;
const port = process.env.PORT || 3500;
const devUrl = process.env.DEV_URL;

// Import Routes
const amdRoutes = require("./routes/amd/amdRoutes");
const cloudRoutes = require("./routes/cloud/cloudRoutes");

// Connect to database
mongoose.connect(
  amdDatabase,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to AmdDB");
  }
);

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", devUrl || "mboulton.com");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send(`this is the root api`);
});
app.use("/amd", amdRoutes);
// app.use("/cloud", cloudRoutes);

// Port Listeners
app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR ", err);
  }
  console.log(`listening on port ${port}`);
});
