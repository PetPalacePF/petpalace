const express = require("express");
const getProducts = require("./routerControllers/Products/getProducts");
const postProduct = require("./routerControllers/Products/postProduct");
const putProduct = require("./routerControllers/Products/putProducts");
const routerProducts = express.Router();

//? GET "/products"
routerProducts.get("/", getProducts);
// routerProducts.get("/:id", getProductsById);

//? POST "/products"
routerProducts.post("/", postProduct);

//? PUT "/products"
routerProducts.put("/:id", putProduct);

module.exports = routerProducts;
