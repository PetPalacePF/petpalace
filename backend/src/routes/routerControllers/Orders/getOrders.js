const findAllOrders = require("../../../controllers/Orders/findAllOrders");
const formattedOrders = require("../../../utils/formatted/formattedOrders");
const activeInputsValidator = require("../../../utils/validators/orders/activeInputsValidator");
const inputValidator = require("../../../utils/validators/orders/inputValidator");
const notFoundValidator = require("../../../utils/validators/orders/notFoundValidator");
const jsonOrdersError = require("../../../utils/validators/orders/errors/jsonOrdersError");

const getOrders = async (req, res) => {
  const {
    page = 1,
    pageSize = 15,
    filterPurchases = [],
    filterUsers = [],
    sortId = "",
  } = req.query;
  const paginated = { page, pageSize };
  const queryInputs = { page, pageSize, filterPurchases, filterUsers, sortId };
  const emptyTable = `No se ha encontrado ninguna Orden registrada en la base de datos`;
  let orders;

  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    const message = jsonOrdersError(queryError.message);
    return res.status(404).json(message);
  }
  const inputsActive = activeInputsValidator(queryInputs);

  try {
    if (inputsActive) {
      orders = await findAllOrders(paginated, queryInputs);
      if (orders.totalResults === 0) {
        const notFound_Orders = notFoundValidator(queryInputs);
        const message = jsonOrdersError(notFound_Orders);
        return res.status(404).json(message);
      }
    } else {
      orders = await findAllOrders(paginated);
      if (orders.totalResults === 0) {
        const message = jsonOrdersError(emptyTable);
        return res.status(404).json(message);
      }
    }

    const {
      totalResults,
      totalPages,
      currentPage,
      pageSize,
      ordersDB,
      status,
      message,
    } = orders;

    const ordersResult = formattedOrders(ordersDB);
    return res.status(status).json({
      totalResults: totalResults,
      totalPages: totalPages,
      currentPage: currentPage,
      pageSize: pageSize,
      orders: ordersResult,
      // message: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrders;
