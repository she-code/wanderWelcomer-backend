const express = require("express");
const route = express.Router();
const userController = require("../controllers/usersController");

route.post("/register", userController.register);
route.post("/login", userController.login);

route.get("/", userController.getAllUsers);
module.exports = route;
