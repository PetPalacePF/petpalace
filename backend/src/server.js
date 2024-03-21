const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

//? SERVER
const server = express();

// * Enviroments var
// const { FRONTEND_URL } = require('./config.js')

//*MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());

// server.use(cors({
//     origin: FRONTEND_URL
// }));

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
  });


// RUTAS
server.use(router);

module.exports = server;
