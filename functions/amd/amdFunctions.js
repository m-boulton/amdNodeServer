const AmdNav = require("../../models/amd/amdNavModel");

// Get db version and return its value
const databaseVersionCheck = async (schema, log) => {
  try {
    const response = await schema.findOne({ primary: true });
    const currentVersion = await response.version;
    if (log) {
      console.log(`--- Database Current Version : ${currentVersion} ---`);
    }
    return currentVersion;
  } catch (error) {
    console.log("There was an error with database version check : ", error);
  }
};

// Update db version
const databaseVersionUpdate = async (schema, log) => {
  try {
    const currentVersion = await databaseVersionCheck(schema, log);
    const updatedVersion = currentVersion + 1;
    return updatedVersion;
  } catch (error) {
    console.log("There was an error updating the amd nav version", error);
  }
};

// Check Amd db version
const amdNavVersionCheck = async (log) => {
  const version = databaseVersionCheck(AmdNav, log);
  return version;
};
// Update Amd db version
const amdNavVersionUpdate = async (log) => {
  const version = await databaseVersionUpdate(AmdNav, log);
  return version;
};

// Check for authentication
const auth = (req, res, next) => {
  if (req.body.auth) {
    next();
  } else {
    console.log(
      `Posting priveleges have been denied by ${JSON.stringify(
        req.headers.host
      )}`
    );
    res.json({
      message: "Incorrect Password",
      error: true,
      errorData: "Incorrect password",
    });
  }
};

module.exports = {
  amdNavVersionCheck,
  amdNavVersionUpdate,
  auth,
};
