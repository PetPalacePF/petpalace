const findOrderbyId = require("../../../controllers/Orders/findOrderbyId");
const formattedOrder = require("../../../utils/formatted/formattedOrder");
const jsonOrdersErrorById = require("../../../utils/validators/orders/errors/jsonOrdersErrorById");



const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await findOrderbyId(id);
    return order
    ?  res.status(200).json(formattedOrder(order))
    :  res.status(404).json(jsonOrdersErrorById(`No existe una orden con id: ${id}`));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrderById;
