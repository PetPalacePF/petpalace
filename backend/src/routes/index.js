const { Router } = require("express");
const router = Router();
const routerAdmin = require("./admin");
const routerCategories = require("./categories");
const routerOrders = require("./orders");
const routerProducts = require("./products");
const routerPurchases = require("./purchases");
const routerUsers = require("./users");

//? RUTAS
router.use("/admin", routerAdmin);
router.use("/categories", routerCategories);
router.use("/orders", routerOrders);
router.use("/products", routerProducts);
router.use("/purchases", routerPurchases);
router.use("/users", routerUsers);


module.exports = router;
