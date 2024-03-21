const express = require("express");
const getOrderById = require("./routerControllers/Orders/getOrderById");
const getOrders = require("./routerControllers/Orders/getOrders");
const postOrder = require("./routerControllers/Orders/postOrder");
const routerOrders = express.Router();

//? GET "/orders"
routerOrders.get("/", getOrders);
routerOrders.get("/:id", getOrderById);

//? POST "/orders"
routerOrders.post("/", postOrder);

module.exports = routerOrders;
