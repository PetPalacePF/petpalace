const express = require("express");
const getCategories = require("./routerControllers/Categories/getCategories");
const getCategoryById = require("./routerControllers/Categories/getCategoryById");
const postCategories = require("./routerControllers/Categories/postCategories");
const putCategories = require("./routerControllers/Categories/putCategories");
const deleteCategory = require("./routerControllers/Categories/deleteCategory");
const routerCategories = express.Router();

//? GET "/categories"
routerCategories.get("/", getCategories);
routerCategories.get("/:id", getCategoryById);

//? POST "/categories"
routerCategories.post("/", postCategories);

//? PUT "/categories"
routerCategories.put("/", putCategories);

//? DELETE "/categories"
routerCategories.delete("/:id", deleteCategory)

module.exports = routerCategories;