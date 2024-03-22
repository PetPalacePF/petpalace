const jsonCategoriesReader = require("./jsonCategoriesReader");

const findJsonCategories = async () => {
  try {
    const jsonCategories = await jsonCategoriesReader();
    return jsonCategories.categories;
  } catch (error) {
    console.error("Error al leer el archivo: ", error);
    throw new Error("Error al leer el archivo: ", error);
  }
};

module.exports = findJsonCategories;
