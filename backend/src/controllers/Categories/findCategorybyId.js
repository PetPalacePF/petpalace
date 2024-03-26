const { Category, Product } = require("../../db");

const findCategorybyId = async (id) => {
  const category = await Category.findByPk(id, {
    include: {
      model: Product,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return category;
};

module.exports = findCategorybyId;