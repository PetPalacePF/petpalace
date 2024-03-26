const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

//? SERVER
const server = express();

// * Enviroments var
const { FRONTEND_URL } = require("./config.js");

//*MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

// RUTAS
server.use(router);

module.exports = server;
