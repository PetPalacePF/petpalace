const { Category, Product } = require("../../db");

const findAllBrands = async (query) => {
  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const resultSet = new Set();
  products.forEach((product) => resultSet.add(product.brand));
  const result = Array.from(resultSet).sort();


  return result;
};

module.exports = findAllBrands;
