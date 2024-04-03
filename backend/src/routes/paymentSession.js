const express = require("express");
const postPaymentSession = require("./routerControllers/PaymentSession/postPaymentSession")
const routerPaymentSession = express.Router();

//? POST "/paymentSession"
routerPaymentSession.post("/", postPaymentSession)

module.exports = routerPaymentSession