const express = require("express");
//const getMail = require("./routerControllers/Mail/getMail");
const postMail = require("./routerControllers/Mail/postMail");
const postMail2 = require("./routerControllers/Mail/postMail2");
//const putUser_Admin = require("./routerControllers/Admin/putUser_Admin");

const routerMail = express.Router();

//? GET "/mail"
//routerMail.get("/", getMail);
// routerProducts.get("/:id", getProductsById);

//? POST "/mail"
routerMail.post("/", postMail);
routerMail.post("/review", postMail2);
// routerProducts.post("/", postProduct);

//? PUT "/admin/users"
//routerMail.put("/users", putUser_Admin);

module.exports = routerMail;
