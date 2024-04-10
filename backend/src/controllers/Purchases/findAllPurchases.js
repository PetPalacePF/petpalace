const { Purchase, Order, User } = require("../../db");
const filterByOrders = require("./purchases_utils/filterByOrders");
const filterByUsers = require("./purchases_utils/filterByUsers");
const SortByQuery = require("./purchases_utils/SortByQuery");
const findAll_returnValidator = require("../../utils/validators/purchases/findAll_returnValidator");


const findAllPurchases = async (paginated, queryInputs) => {
  let includeOrdersClause = {};
  let includeUsersClause = {};
  let orderClause = [["id", "ASC"]];
  const { page, pageSize } = paginated;
  const offset = (page - 1) * pageSize;

  if (queryInputs) {
    includeOrdersClause = filterByOrders(queryInputs);
    includeUsersClause = filterByUsers(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }

  const purchases = await Purchase.findAndCountAll({
    include: [
      {
        model: Order,
        attributes: ["id"],
        where: includeOrdersClause,
      },
      {
        model: User,
        attributes: ["id", "name", "email"],
        where: includeUsersClause,
      },
    ],
    order: orderClause,
    limit: pageSize,
    offset: offset,
  });

  const { count, rows } = purchases;
  const totalPages = Math.ceil(count / pageSize);
  const { message, status } = findAll_returnValidator(rows, page, totalPages);

  return {
    totalResults: count,
    totalPages: totalPages,
    currentPage: page,
    pageSize: pageSize,
    purchasesDB: rows,
    message: message,
    status: status,
  };
};

module.exports = findAllPurchases;
