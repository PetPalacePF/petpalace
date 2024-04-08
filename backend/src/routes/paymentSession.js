const express = require("express");
const getPayment = require("./routerControllers/PaymentSession/getPayment")
const getpaymentById = require("./routerControllers/PaymentSession/getpaymentById")
const postPaymentSession = require("./routerControllers/PaymentSession/postPaymentSession")
const routerPaymentSession = express.Router();


//? GET "/paymentSession"
routerPaymentSession.get("/payment", getPayment)
routerPaymentSession.get("/payment/:id", getpaymentById)

//? POST "/paymentSession"
routerPaymentSession.post("/", postPaymentSession)

module.exports = routerPaymentSession