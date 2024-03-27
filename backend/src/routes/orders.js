const express = require("express");
const getOrderById = require("./routerControllers/Orders/getOrderById");
const getOrders = require("./routerControllers/Orders/getOrders");
const postOrder = require("./routerControllers/Orders/postOrder");
const putOrder = require("./routerControllers/Orders/putOrder");
const deleteOrder = require("./routerControllers/Orders/deleteOrder");
const routerOrders = express.Router();
const getOrdersByUser = require("./routerControllers/Orders/getOrdersByUser");
//? GET "/orders"
routerOrders.get("/", getOrders);
routerOrders.get("/:id", getOrderById);
routerOrders.get("/user/:UserId", getOrdersByUser);
//? POST "/orders"
routerOrders.post("/", postOrder);

//? PUT "/orders"
routerOrders.put("/", putOrder);

//? DELETE "/orders"
routerOrders.delete("/:id", deleteOrder);

module.exports = routerOrders;
