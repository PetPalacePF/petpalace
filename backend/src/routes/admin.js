const express = require("express");
const getAdmin = require("./routerControllers/Admin/getAdmin");
const putUser_Admin = require("./routerControllers/Admin/putUser_Admin");

const routerAdmin = express.Router();

//? GET "/admin"
routerAdmin.get("/", getAdmin);
// routerProducts.get("/:id", getProductsById);

//? POST "/admin"
// routerProducts.post("/", postProduct);

//? PUT "/admin/users"
routerAdmin.put("/users", putUser_Admin);

module.exports = routerAdmin;
