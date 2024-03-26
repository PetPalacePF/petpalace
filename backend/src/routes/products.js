const express = require("express");
const getProductById = require("./routerControllers/Products/getProductById");
const getProducts = require("./routerControllers/Products/getProducts");
const postProduct = require("./routerControllers/Products/postProduct");
const putProduct = require("./routerControllers/Products/putProducts");
const deleteProducts = require("./routerControllers/Products/deleteProducts");
const routerProducts = express.Router();

//? GET "/products"
routerProducts.get("/", getProducts);
routerProducts.get("/:id", getProductById);

//? POST "/products"
routerProducts.post("/", postProduct);

//? PUT "/products"
routerProducts.put("/", putProduct);

//? DELETE "/products"
routerProducts.delete("/:id", deleteProducts);

module.exports = routerProducts;
