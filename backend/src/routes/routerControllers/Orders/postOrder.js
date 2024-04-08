const createOrder = require("../../../controllers/Orders/createOrder");

const postOrder = async (req, res) => {
  const { products, userId } = req.body;
  
  if (!products || products.length === 0 || !userId) {
    return res.status(500).json({
      error:
        "Para crear una Orden, debe tener al menos un Producto y un usuario asociado",
    });
  }

  try {
    const newOrder = await createOrder( products, userId );
    console.log(newOrder.dataValues.hasOwnProperty("id"));
    newOrder.dataValues.hasOwnProperty("id")
    ? res.status(201).json({newOrder: newOrder})
    : res.status(400).json({ newOrder: null, message: newOrder.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postOrder;
