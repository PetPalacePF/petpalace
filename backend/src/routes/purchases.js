const express = require("express");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
// routerPurchases.get("/:id", getProductsById);

//? POST "/purchases"
// routerPurchases.post("/", postProduct);

module.exports = routerPurchases;