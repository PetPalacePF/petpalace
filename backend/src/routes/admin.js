const express = require("express");
const getAdmin = require("./routerControllers/Admin/getAdmin");
const routerAdmin = express.Router();

//? GET "/admin"
routerAdmin.get("/", getAdmin);
// routerProducts.get("/:id", getProductsById);

//? POST "/admin"
// routerProducts.post("/", postProduct);

module.exports = routerAdmin;
