const server = require("./src/server");
const { dataBase } = require("./src/db.js");
const PORT = 5000;

dataBase
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
