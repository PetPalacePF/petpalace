const createPurchase = require("../../../controllers/Purchases/createPurchase");

const postPurchase = async (req, res) => {
  const { orders, userId } = req.body;
 
  if (!orders || orders.length === 0 || !userId) {
    return res.status(500).json({
      error:
        "Para crear una Compra, debe tener al menos una Orden y un usuario asociado",
    });
  }

  try {
    const newPurchase = await createPurchase( orders, userId );
    newPurchase.hasOwnProperty("UserId")
    ? res.status(201).json(newPurchase)
    : res.status(500).send(newPurchase.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchase;
