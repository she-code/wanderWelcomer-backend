const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Welcome");
});
module.exports = app;
