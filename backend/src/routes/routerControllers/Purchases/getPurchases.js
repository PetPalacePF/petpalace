const findAllPurchases = require("../../../controllers/Purchases/findAllPurchases");
const formattedPurchases = require("../../../utils/formatted/formattedPurchases");
const activeInputsValidator = require("../../../utils/validators/purchases/activeInputsValidator");
const notFoundValidator = require("../../../utils/validators/purchases/notFoundValidator");
const inputValidator = require("../../../utils/validators/purchases/inputValidator");
const jsonPurchasesError = require("../../../utils/validators/purchases/errors/jsonPurchasesError");

const getPurchases = async (req, res) => {
  const {
    page = 1,
    pageSize = 15,
    filterOrders = [],
    filterUsers = [],
    sortId = "",
    sortUsers = "",
  } = req.query;
  const paginated = { page, pageSize };
  const queryInputs = { filterOrders, filterUsers, sortId, sortUsers };
  const emptyTable = `No se ha encontrado ninguna Compra registrada en la base de datos`;
  let purchases;

  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    const message = jsonPurchasesError(queryError.message);
    return res.status(400).json(message);
  }
  const inputsActive = activeInputsValidator(queryInputs);

  try {
    if (inputsActive) {
      purchases = await findAllPurchases(paginated, queryInputs);
      if (purchases.length === 0) {
        const notFound_Purchases = notFoundValidator(queryInputs);
        const message = jsonPurchasesError(notFound_Purchases);
        return res.status(404).json(message);
      }
    } else {
      purchases = await findAllPurchases(paginated);
      if (purchases.length === 0) {
        const message = jsonPurchasesError(emptyTable);
        return res.status(404).json(message);
      }
    }

    const {
      totalResults,
      totalPages,
      currentPage,
      pageSize,
      purchasesDB,
      status,
      message,
    } = purchases;

    console.log(totalResults);
    console.log(purchasesDB);
    console.log(message);

    const purchasesResult = formattedPurchases(purchasesDB);
    return res.status(status).json({
      totalResults: totalResults,
      totalPages: totalPages,
      currentPage: currentPage,
      pageSize: pageSize,
      purchases: purchasesResult,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchases;
