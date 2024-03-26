const { Product, Category } = require("../../db");
const filterByCategories = require("./product_utils/filterByCategories");
const filterByPrice = require("./product_utils/filterByPrice");
const findByQueryBrand_or_Name = require("./product_utils/findByQueryBrand_or_Name");
const { Op } = require("sequelize");

const findAllProducts = async (queryInputs) => {
  let whereClause = {};
  let includeClause = {};

  if (queryInputs) {
    whereClause = await findByQueryBrand_or_Name(queryInputs);
    includeClause = await filterByCategories(queryInputs);
  }

  const products = await Product.findAll({
    where: whereClause,
    where: whereClause,
    include: {
      model: Category,
      attributes: ["name"],
      where: includeClause,
      through: {
        attributes: [],
      },
    },
    order: [["id", "ASC"]],
  });

  return products;
};

module.exports = findAllProducts;
