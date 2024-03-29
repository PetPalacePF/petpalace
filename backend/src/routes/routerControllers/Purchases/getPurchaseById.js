const findPurchasebyId = require("../../../controllers/Purchases/findPurchasebyId");
const formattedPurchase = require("../../../utils/formatted/formattedPurchase");



const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await findPurchasebyId(id);
    return purchase
    ?  res.status(200).json({ purchase: formattedPurchase(purchase) })
    :  res.status(400).send(`No existe la compra con id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchaseById;
