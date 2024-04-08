const { Product, Category } = require("../../db");
const filterByCategories = require("./product_utils/filterByCategories");
const findByQuery = require("./product_utils/findByQuery");
const SortByQuery = require("./product_utils/SortByQuery");
const findAll_returnValidator = require("../../utils/validators/products/findAll_returnValidator");

const findAllProducts = async (paginated, queryInputs) => {
  let whereClause = {};
  let includeCategoriesClause = {};
  let orderClause = [["id", "ASC"]];
  const { page, pageSize } = paginated;
  const offset = (page - 1) * pageSize;

  if (queryInputs) {
    whereClause = findByQuery(queryInputs);
    includeCategoriesClause = filterByCategories(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }

  const products = await Product.findAndCountAll({
    where: whereClause,
    include: {
      model: Category,
      attributes: ["id", "name"],
      where: includeCategoriesClause,
      through: {
        attributes: [],
      },
    },
    order: orderClause,
    limit: pageSize, // Especifica cuántos resultados devolver/mostrar
    offset: offset, // Especifica cuántos resultados omitir
  });

  const { count, rows } = products;
  const totalPages = Math.ceil(count / pageSize);
  const { message, status } = findAll_returnValidator(rows, page, totalPages);

  return {
    totalResults: count,
    totalPages: totalPages,
    currentPage: page,
    pageSize: pageSize,
    productsDB: rows,
    message: message,
    status: status,
  };
};

module.exports = findAllProducts;
