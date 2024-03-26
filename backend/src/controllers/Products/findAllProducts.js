const { Product, Category } = require("../../db");
const { Op } = require("sequelize");

const findAllProducts = async (query) => {
  let whereClause = {};
  if (query && query !== "") {
    whereClause[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      {
        brand: {
          [Op.iLike]: `%${query}%`,
        },
      },
    ];
  }
  
  const products = await Product.findAll({
    where: whereClause,
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    order: [["id", "ASC"]],
  });

  return products;
};

module.exports = findAllProducts;
