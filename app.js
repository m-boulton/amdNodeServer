const express = require("express");
const app = express();
// ROUTES
app.get("/", (req, res) => {
  res.send("we are home");
});
// PORT LISTENERS
app.listen(3000, () => console.log("listening on port 3000"));
