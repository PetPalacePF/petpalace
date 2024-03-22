const express = require("express");
const getProducts = require("./routerControllers/Products/getProducts");
const postProduct = require("./routerControllers/Products/postProduct");
const deleteProducts = require("./routerControllers/Products/deleteProducts")
const routerProducts = express.Router();

//? GET "/products"
routerProducts.get("/", getProducts);
// routerProducts.get("/:id", getProductsById);

//? POST "/products"
routerProducts.post("/", postProduct);

//? DELETE "/products"
routerProducts.delete("/:id", deleteProducts)

module.exports = routerProducts;
