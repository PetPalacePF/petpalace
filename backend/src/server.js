const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

//? SERVER
const server = express();

// * Enviroments var
const { URL } = require("./config.js");

//*MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(
  cors({
    origin: URL,
  })
);

// RUTAS
server.use(router);
//TEST
module.exports = server;
