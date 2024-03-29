const { Purchase, Order, User } = require("../../db");
const filterByOrders = require("./purchases_utils/filterByOrders");
const filterByUsers = require("./purchases_utils/filterByUsers");
const SortByQuery = require("./purchases_utils/SortByQuery");

const findAllPurchases = async (queryInputs) => {
  let includeOrdersClause = {};
  let includeUsersClause = {};
  let orderClause = [["id", "ASC"]];

  if (queryInputs) {
    includeOrdersClause = filterByOrders(queryInputs);
    includeUsersClause = filterByUsers(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }

  const purchases = await Purchase.findAll({
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
  });

  return purchases;
};

module.exports = findAllPurchases;
