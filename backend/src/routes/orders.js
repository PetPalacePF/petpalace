const express = require("express");
const getOrders = require("./routerControllers/Orders/getOrders");
const postOrder = require("./routerControllers/Orders/postOrder");
const routerOrders = express.Router();

//? GET "/orders"
routerOrders.get("/", getOrders);
// routerOrders.get("/:id", getProductsById);

//? POST "/orders"
routerOrders.post("/", postOrder);

module.exports = routerOrders;
