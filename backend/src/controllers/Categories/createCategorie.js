const { Categorie } = require("../../db");

const createCategorie = async (name) => {
  const newCategorie = await Categorie.create(name);
  return newCategorie;
};

module.exports = createCategorie;
