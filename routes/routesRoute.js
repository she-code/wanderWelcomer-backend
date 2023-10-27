const express = require("express");
const routesController = require("../controllers/routesController");
const route = express.Router();
route.post("/create", routesController.createRoute);
module.exports = route;
