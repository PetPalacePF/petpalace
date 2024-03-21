const express = require("express");
const getPurchaseById = require("./routerControllers/Purchases/getPurchaseById");
const getPurchases = require("./routerControllers/Purchases/getPurchases");
const postPurchase = require("./routerControllers/Purchases/postPurchase");
const routerPurchases = express.Router();

//? GET "/purchases"
routerPurchases.get("/", getPurchases);
routerPurchases.get("/:id", getPurchaseById);

//? POST "/purchases"
routerPurchases.post("/", postPurchase);

module.exports = routerPurchases;