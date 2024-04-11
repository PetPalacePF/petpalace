const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

//? SERVER
const server = express();

// * Enviroments var
const { FRONTEND_URL } = require("./config.js");

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

//*MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));

// RUTAS
server.use(router);
//TEST
module.exports = server;
