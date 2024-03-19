const express = require("express");
const getOrders = require("./routerControllers/Orders/getOrders");
const routerOrders = express.Router();

//? GET "/orders"
routerOrders.get("/", getOrders);
// routerOrders.get("/:id", getProductsById);

//? POST "/orders"
// routerOrders.post("/", postProduct);

module.exports = routerOrders;
