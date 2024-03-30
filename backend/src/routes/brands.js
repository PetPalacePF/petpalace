const express = require("express");
const getBrands = require("./routerControllers/Brands/getBrands");
const routerBrands = express.Router();

//? GET "/brands"
routerBrands.get("/", getBrands);

module.exports = routerBrands;