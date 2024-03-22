const { Product, Category } = require("../../db");

const findAllProducts = async (query) => {

  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    order: [['id', 'ASC']]
  });

  return products;
};

module.exports = findAllProducts;
