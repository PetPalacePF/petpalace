const app = require("./src/app");
const database = require("./src/db");
const {PORT} = require("./src/config");

database();
app.listen(PORT);
