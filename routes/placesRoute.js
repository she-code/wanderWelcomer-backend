const express = require("express");
const placesController = require("../controllers/placesController");
const route = express.Router();
route.post("/create", placesController.createPlace);
route.get("/", placesController.getAllPlaces);
route.get("/:id", placesController.getPlace);
route.delete("/:id", placesController.deletePlace);

route.get("/all/:category", placesController.getPlacesByCategory);
module.exports = route;
