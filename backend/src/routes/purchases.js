const express = require("express");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const postPurchase = require("./routerControllers/Purchases/postPurchase");
const putPurchase = require("./routerControllers/Purchases/putPurchase");
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
// routerPurchases.get("/:id", getProductsById);

//? POST "/purchases"
routerPurchases.post("/", postPurchase);

//? PUT "/purchases"
routerPurchases.put("/:id", putPurchase);

module.exports = routerPurchases;