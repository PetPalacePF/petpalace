const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
// routerCategories.get("/:id", getProductsById);

//? POST "/categories"
// routerCategories.post("/", postProduct);

module.exports = routerCategories;