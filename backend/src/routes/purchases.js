const express = require("express");
const getPurchaseById = require("./routerControllers/Purchases/getPurchaseById");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const postPurchase = require("./routerControllers/Purchases/postPurchase");
const putPurchase = require("./routerControllers/Purchases/putPurchase");
const deletePurchase = require("./routerControllers/Purchases/deletePurchase");
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
routerPurchases.get("/:id", getPurchaseById);

//? POST "/purchases"
routerPurchases.post("/", postPurchase);

//? PUT "/purchases"
// routerPurchases.put("/:id", putPurchase);

//? DELETE "/purchases"
routerPurchases.delete("/:id", deletePurchase);

module.exports = routerPurchases;