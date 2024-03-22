const express = require("express");
const getOrderById = require("./routerControllers/Orders/getOrderById");
const getOrders = require("./routerControllers/Orders/getOrders");
const postOrder = require("./routerControllers/Orders/postOrder");
const putOrder = require("./routerControllers/Orders/putOrder");
const deleteOrder = require("./routerControllers/Orders/deleteOrder");
const routerOrders = express.Router();

//? GET "/orders"
routerOrders.get("/", getOrders);
routerOrders.get("/:id", getOrderById);

//? POST "/orders"
routerOrders.post("/", postOrder);

//? PUT "/orders"
routerOrders.put("/:id", putOrder);

//? DELETE "/orders"
routerOrders.delete("/:id", deleteOrder);

module.exports = routerOrders;
