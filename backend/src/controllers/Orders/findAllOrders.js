const { Order, Product, User, Purchase } = require("../../db");
const filterByPurchases = require("./orders_utils/filterByPurchases");
const filterByUsers = require("./orders_utils/filterByUsers");
const SortByQuery = require("./orders_utils/SortByQuery");
const purchaseModelCreator = require("./orders_utils/purchaseModelCreator");

const findAllOrders = async (queryInputs) => {
  let includePurchasesClause = {};
  let includeUsersClause = {};
  let orderClause = [["id", "ASC"]];

  if (queryInputs) {
    includePurchasesClause = filterByPurchases(queryInputs);
    includeUsersClause = filterByUsers(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }
  const purchaseModel = purchaseModelCreator(includePurchasesClause, Purchase);

  const orders = await Order.findAll({
    include: [
      {
        model: Product,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      purchaseModel,
      {
        model: User,
        attributes: ["id", "name", "email"],
        where: includeUsersClause,
      },
    ],
    order: orderClause,
  });

  return orders;
};

module.exports = findAllOrders;
