const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const postCategorie = require("./routerControllers/Categories/postCategorie");
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
// routerCategories.get("/:id", getProductsById);

//? POST "/categories"
routerCategories.post("/", postCategorie);

module.exports = routerCategories;