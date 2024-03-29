const removePurchase = require("../../../controllers/Purchases/removePurchase");

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    purchaseDeleted = await removePurchase(id);
    purchaseDeleted
    ? message = `Compra '${id}' eliminada correctamente`
    : message = `No existe una Compra con el '${id}' para eliminar`

    res.status(200).send(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePurchase;
