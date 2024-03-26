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
      where: whereClause_categories,
      through: {
        attributes: [],
      },
    },
    order: [["id", "ASC"]],
  });

  return PRODUCTS_JSON;
};

module.exports = findAllProducts;
