const createOrder = require("../../../controllers/Orders/createOrder");

const postOrder = async (req, res) => {
  const { products, userId } = req.body;

  try {
    const newOrder = await createOrder( products, userId );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postOrder;
