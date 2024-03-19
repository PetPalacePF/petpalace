const express = require("express");
const getProducts = require("./routerControllers/Products/getProducts");
const routerProducts = express.Router();

//? GET "/products"
routerProducts.get("/", getProducts);
// routerProducts.get("/:id", getProductsById);

//? POST "/products"
// routerProducts.post("/", postProduct);

module.exports = routerProducts;
