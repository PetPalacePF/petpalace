const { Product, Category } = require("../../db");
const filterByCategories = require("./product_utils/filterByCategories");
const findByQuery = require("./product_utils/findByQuery");
const SortByQuery = require("./product_utils/SortByQuery");
const { Op } = require("sequelize");

const findAllProducts = async (queryInputs) => {
  let whereClause = {};
  let includeClause = {};
  let orderClause = [["id", "ASC"]];

  if (queryInputs) {
    whereClause = await findByQuery(queryInputs);
    includeClause = await filterByCategories(queryInputs);
    orderClause = await SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }
  
  const products = await Product.findAll({
    where: whereClause,
    include: {
      model: Category,
      attributes: ["name"],
      where: includeClause,
      through: {
        attributes: [],
      },
    },
    order: orderClause,
  });

  return products;
};

module.exports = findAllProducts;
