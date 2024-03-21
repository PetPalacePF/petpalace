const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const postCategories = require("./routerControllers/Categories/postCategories");
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
// routerCategories.get("/:id", getProductsById);

//? POST "/categories"
routerCategories.post("/", postCategories);

module.exports = routerCategories;