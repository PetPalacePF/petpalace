const express = require("express");
const getProductById = require("./routerControllers/Products/getProductById");
const getProducts = require("./routerControllers/Products/getProducts");
const postProduct = require("./routerControllers/Products/postProduct");
const routerProducts = express.Router();

//? GET "/products"
routerProducts.get("/", getProducts);
routerProducts.get("/:id", getProductById);

//? POST "/products"
routerProducts.post("/", postProduct);

module.exports = routerProducts;
