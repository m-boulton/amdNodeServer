const AmdNav = require("../../models/amd/amdModelNav");

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

module.exports = {
  amdNavVersionCheck,
  amdNavVersionUpdate,
};
