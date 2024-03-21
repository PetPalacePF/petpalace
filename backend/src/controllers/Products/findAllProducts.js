const PRODUCTS_JSON = require('../../dbProducts.json')

const { Product, Category } = require("../../db");

// const { Op } = require("sequelize");

const findAllProducts = async (query) => {
  // let whereClause = {};
  // if (query) {
  //   whereClause.nombre = {
  //     [Op.iLike]: `%${query}%`,
  //   };
  // }

  const products = await Product.findAll({
    // where: whereClause,
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return PRODUCTS_JSON;
};

module.exports = findAllProducts;