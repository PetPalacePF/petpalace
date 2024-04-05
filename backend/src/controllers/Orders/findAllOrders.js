const { Op } = require("sequelize");
const { Order, Product, User, Purchase } = require("../../db");
const filterByPurchases = require("./orders_utils/filterByPurchases");
const filterByUsers = require("./orders_utils/filterByUsers");
const SortByQuery = require("./orders_utils/SortByQuery");
const purchaseModelCreator = require("./orders_utils/purchaseModelCreator");
const findAll_returnValidator = require("../../utils/validators/orders/findAll_returnValidator");

const findAllOrders = async (paginated, queryInputs) => {
  let includePurchasesClause = {};
  let includeUsersClause = {};
  let orderClause = [["id", "ASC"]];
  const { page, pageSize } = paginated;
  const offset = (page - 1) * pageSize;

  if (queryInputs) {
    includePurchasesClause = filterByPurchases(queryInputs);
    includeUsersClause = filterByUsers(queryInputs);
    orderClause = SortByQuery(queryInputs);
    orderClause.length === 0 && (orderClause = [["id", "ASC"]]);
  }
  const purchaseModel = purchaseModelCreator(includePurchasesClause, Purchase);


   // Consulta para obtener el recuento total de órdenes
   const totalCount = await Order.count({
    where: {
      [Op.and]: [
        includeUsersClause, // Agregar la cláusula includeUsersClause existente
        includePurchasesClause // Agregar la cláusula includePurchasesClause
      ]
    }
  });


  const orders = await Order.findAndCountAll({
    include: [
      {
        model: Product,
        attributes: ["id", "brand", "name", "price", "stock", "img"],
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
    limit: pageSize,
    offset: offset,
  });

  const { rows } = orders;
  const totalPages = Math.ceil(totalCount / pageSize);
  const { message, status } = findAll_returnValidator(rows, page, totalPages);

  return {
    totalResults: totalCount,
    totalPages: totalPages,
    currentPage: page,
    pageSize: pageSize,
    ordersDB: rows,
    message: message,
    status: status,
  };
};

module.exports = findAllOrders;
