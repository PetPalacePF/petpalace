const findAllOrders = require("../../../controllers/Orders/findAllOrders");
const formattedOrders = require("../../../utils/formatted/formattedOrders");


const getOrders = async (req, res) => {
  try {
    const orders = await findAllOrders();
    return res.status(200).json(formattedOrders(orders));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrders;
