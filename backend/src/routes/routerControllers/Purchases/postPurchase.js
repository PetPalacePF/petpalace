const createPurchase = require("../../../controllers/Purchases/createPurchase");

const postPurchase = async (req, res) => {
  const { orders, userId } = req.body;

  try {
    const newPurchase = await createPurchase( orders, userId );
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
