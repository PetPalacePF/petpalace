const express = require("express");
const getOrders = require("./routerControllers/Orders/getOrders");
const postOrder = require("./routerControllers/Orders/postOrder");
const putOrder = require("./routerControllers/Orders/putOrder");
const routerOrders = express.Router();

//? GET "/orders"
routerOrders.get("/", getOrders);
// routerOrders.get("/:id", getProductsById);

//? POST "/orders"
routerOrders.post("/", postOrder);

//? PUT "/orders"
routerOrders.put("/:id", putOrder);

module.exports = routerOrders;
