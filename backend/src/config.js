require("dotenv").config();

const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017/petpalace";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://127.0.0.1:5173";
const PORT = process.env.PORT || 5000;

module.exports = { DB_HOST, FRONTEND_URL, PORT };
