const express = require("express");
const getUserById = require("./routerControllers/Users/getUserById");
const getUsers = require("./routerControllers/Users/getUsers");
const postUser = require("./routerControllers/Users/postUser");
const putUser = require("./routerControllers/Users/putUser");
const deleteUser = require("./routerControllers/Users/deleteUser");
const routerUsers = express.Router();

//? GET "/users"
routerUsers.get("/", getUsers);
routerUsers.get("/:id", getUserById);

//? POST "/users"
routerUsers.post("/", postUser);

//? PUT "/users"
routerUsers.put("/", putUser);

//? DELETE "/users"
routerUsers.delete("/:id", deleteUser);

module.exports = routerUsers;