const { Product, Category } = require("../../db");
const filterByCategories = require("./product_utils/filterByCategories");
const findByQuery = require("./product_utils/findByQuery");
const SortByQuery = require("./product_utils/SortByQuery");

const findAllProducts = async (queryInputs) => {
  let whereClause = {};
  let includeCategoriesClause = {};
  let orderClause = [["id", "ASC"]];

  if (queryInputs) {
    whereClause = findByQuery(queryInputs);
    includeCategoriesClause = filterByCategories(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }

  const products = await Product.findAll({
    where: whereClause,
    include: {
      model: Category,
      attributes: ["name"],
      where: includeCategoriesClause,
      through: {
        attributes: [],
      },
    },
    order: orderClause,
  });

  return products;
};

module.exports = findAllProducts;
