const { Product, Category } = require("../../db");

const findProductbyId = async (id) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return product;
};

module.exports = findProductbyId;
