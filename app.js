const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

//import files
const placesRoute = require("./routes/placesRoute");
const usersRoute = require("./routes/usersRoute");
const routesRoute = require("./routes/routesRoute");

//creates express application
const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Welcome");
});

//routes
app.use("/api/v1/places", placesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/routes", routesRoute);

module.exports = app;
