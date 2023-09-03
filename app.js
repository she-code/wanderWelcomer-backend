const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "./config.env" });

//import files
const placesRoute = require("./routes/placesRoute");
//creates express application
const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Welcome");
});

//routes
app.use("/api/v1/places", placesRoute);
module.exports = app;
