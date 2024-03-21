const findOrderbyId = require("../../../controllers/Orders/findOrderbyId");


const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await findOrderbyId(id);
    return order
    ?  res.status(200).json({ order: order })
    :  res.status(400).send(`No existe una orden con id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrderById;
