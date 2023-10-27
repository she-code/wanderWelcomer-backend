const express = require("express");
const committeApplication = require("../controllers/committeApplication");
const route = express.Router();
route.post("/apply", committeApplication.applyCommitte);
route.get("/", committeApplication.getAllApplications);
route.get("/pending", committeApplication.getPendingApplication);
route.patch("/:id", committeApplication.updateApplication);
module.exports = route;
