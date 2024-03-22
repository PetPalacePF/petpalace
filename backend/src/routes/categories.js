const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const postCategories = require("./routerControllers/Categories/postCategories");
const deleteCategory = require("./routerControllers/Categories/deleteCategory")
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
// routerCategories.get("/:id", getProductsById);

//? POST "/categories"
routerCategories.post("/", postCategories);

//? DELETE "/categories"
routerCategories.delete("/:id", deleteCategory)

module.exports = routerCategories;