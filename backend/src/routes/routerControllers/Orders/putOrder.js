const modifyOrder = require("../../../controllers/Orders/modifyOrder");
const formattedOrder = require("../../../utils/formatted/formattedOrder");

const putOrder = async (req, res) => {
  const { id, productsToAdd, productsToRemove } = req.body;
  let paramsInputError = false;

  productsToAdd &&
  productsToAdd.forEach((product) => {
    product.forEach((element) => {
      if (isNaN(element)) {
        paramsInputError = true;
      }
    });
  });

  productsToRemove &&
  productsToRemove.forEach((element) => {
    if (isNaN(element)) {
      paramsInputError = true;
    }
  });

  if (paramsInputError) {
    return res
      .status(404)
      .json({ message: `Se admiten únicamente números (id)` });
  }

  try {
    const updatedOrder = await modifyOrder(id, productsToAdd, productsToRemove);
    updatedOrder.hasOwnProperty("id")
      ? res.status(201).json({updated: true, order: formattedOrder(updatedOrder)})
      : res.status(404).json({ updated: false, message: updatedOrder.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putOrder;
