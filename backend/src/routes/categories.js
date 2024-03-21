const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const getCategoryById = require("./routerControllers/Categories/getCategoryById");
const postCategories = require("./routerControllers/Categories/postCategories");
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
routerCategories.get("/:id", getCategoryById);

//? POST "/categories"
routerCategories.post("/", postCategories);

module.exports = routerCategories;