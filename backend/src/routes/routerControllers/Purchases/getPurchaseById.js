const findPurchasebyId = require("../../../controllers/Purchases/findPurchasebyId");
const formattedPurchase = require("../../../utils/formatted/formattedPurchase");
const jsonPurchasesErrorById = require("../../../utils/validators/purchases/errors/jsonPurchasesErrorById");




const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await findPurchasebyId(id);
    return purchase
    ?  res.status(200).json(formattedPurchase(purchase))
    :  res.status(404).json(jsonPurchasesErrorById(`No existe la compra con id: ${id}`));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchaseById;
