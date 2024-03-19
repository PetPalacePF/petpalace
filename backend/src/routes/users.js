const express = require("express");
const getUsers = require("./routerControllers/Users/getUsers");
const routerUsers = express.Router();

//? GET "/users"
routerUsers.get("/", getUsers);
// routerUsers.get("/:id", getUsersById);

//? POST "/users"
// routerUsers.post("/", postUsers);

module.exports = routerUsers;