const express = require("express");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const postPurchase = require("./routerControllers/Purchases/postPurchase");
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
// routerPurchases.get("/:id", getProductsById);

//? POST "/purchases"
routerPurchases.post("/", postPurchase);

module.exports = routerPurchases;