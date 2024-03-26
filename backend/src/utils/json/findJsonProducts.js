const jsonProductReader = require("./jsonProductReader");

const findJsonProducts = async () => {
  try {
    const jsonProducts = await jsonProductReader();
    return jsonProducts.products;
  } catch (error) {
    console.error("Error al leer el archivo: ", error);
    throw new Error("Error al leer el archivo: ", error);
  }
};

module.exports = findJsonProducts;
