const findAllPurchases = require("../../../controllers/Purchases/findAllPurchases");
const formattedPurchases = require("../../../utils/formatted/formattedPurchases");
const activeInputsValidator = require("../../../utils/validators/purchases/activeInputsValidator");
const notFoundValidator = require("../../../utils/validators/purchases/notFoundValidator");
const sortInputValidator = require("../../../utils/validators/purchases/sortInputValidator");

const getPurchases = async (req, res) => {
  const { filterOrders = [], filterUsers = [], sortId = "" } = req.query;
  const queryInputs = { filterOrders, filterUsers, sortId };
  const emptyTable = `No se ha encontrado ninguna Compra registrada en la base de datos`;
  let purchases;

  const queryError = sortInputValidator(queryInputs);
  if (queryError.error) {
    return res.status(404).send(queryError.message);
  }
  const inputsActive = activeInputsValidator(queryInputs);

  try {
    if (inputsActive) {
      purchases = await findAllPurchases(queryInputs);
      if (purchases.length === 0) {
        const notFound_Purchases = notFoundValidator(queryInputs);
        return res.status(404).send(notFound_Purchases);
      }
    } else {
      purchases = await findAllPurchases();
      if (purchases.length === 0) {
        return res.status(404).send(emptyTable);
      }
    }
    return res.status(200).json(formattedPurchases(purchases));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchases;
