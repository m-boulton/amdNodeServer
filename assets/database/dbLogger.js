const AmdDatabaseConnection = require("./mongodbAmd");

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
module.exports = logger;
