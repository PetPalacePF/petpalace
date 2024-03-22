const express = require("express");
const getPurchaseById = require("./routerControllers/Purchases/getPurchaseById");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const postPurchase = require("./routerControllers/Purchases/postPurchase");
const deletePurchase = require("./routerControllers/Purchases/deletePurchase")
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
routerPurchases.get("/:id", getPurchaseById);

//? POST "/purchases"
routerPurchases.post("/", postPurchase);

//? DELETE "/purchases"
routerPurchases.delete("/:id", deletePurchase)

module.exports = routerPurchases;