const express = require("express");
const route = express.Router();
const userController = require("../controllers/usersController");
const auth = require("../middelwares/authentication");
route.post("/register", userController.register);
route.post("/login", userController.login);

route.get("/", userController.getAllUsers);
route.get("/me", auth, userController.getUser);
module.exports = route;
