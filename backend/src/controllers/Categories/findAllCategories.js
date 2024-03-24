const { Category, Product  } = require("../../db");


const findAllCategories = async (query) => {

  const categories = await Category.findAll({
    include: {
      model: Product,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    order: [['id', 'ASC']]
  });

  return categories;
};

module.exports = findAllCategories;
