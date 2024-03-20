const { Categorie, Product  } = require("../../db");


const findAllCategories = async (query) => {

  const categories = await Categorie.findAll({
    include: {
      model: Product,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return categories;
};

module.exports = findAllCategories;
