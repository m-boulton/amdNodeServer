const express = require("express");
const app = express();
// ROUTES
// PORT LISTENERS
app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.static("public"));
