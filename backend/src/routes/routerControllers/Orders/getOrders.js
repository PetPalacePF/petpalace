const findAllOrders = require("../../../controllers/Orders/findAllOrders");
const formattedOrders = require("../../../utils/formatted/formattedOrders");
const activeInputsValidator = require("../../../utils/validators/orders/activeInputsValidator");
const inputValidator = require("../../../utils/validators/orders/inputValidator");

const getOrders = async (req, res) => {
  const { filterPurchases = [], filterUsers = [], sortId = "" } = req.query;
  const queryInputs = { filterPurchases, filterUsers, sortId };
  const emptyTable = `No se ha encontrado ninguna Orden registrada en la base de datos`;
  let orders;

  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    return res.status(404).send(queryError.message);
  }
  const inputsActive = activeInputsValidator(queryInputs);

  try {
    if (inputsActive) {
      orders = await findAllOrders(queryInputs);
      if (orders.length === 0) {
        // const notFound_Purchases = notFoundValidator(queryInputs);
        // return res.status(404).send(notFound_Purchases);
      }
    } else {
      orders = await findAllOrders();
      // if (orders.length === 0) {
      //   return res.status(404).send(emptyTable);
      // }
    }

    return res.status(200).json(formattedOrders(orders));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrders;
