const { Router } = require("express");
const router = Router();
const routerAdmin = require("./admin");
const routerBrands = require("./brands");
const routerCategories = require("./categories");
const routerOrders = require("./orders");
const routerProducts = require("./products");
const routerPurchases = require("./purchases");
const routerUsers = require("./users");
const routerPaymentSession = require("./paymentSession")

//? RUTAS
router.use("/admin", routerAdmin);
router.use("/brands", routerBrands);
router.use("/categories", routerCategories);
router.use("/orders", routerOrders);
router.use("/products", routerProducts);
router.use("/purchases", routerPurchases);
router.use("/users", routerUsers);
router.use("/payment-session", routerPaymentSession)


module.exports = router;
