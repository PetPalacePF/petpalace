const removePurchase = require("../../../controllers/Purchases/removePurchase");

const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    let status;
    let removed;
    const purchaseDeleted = await removePurchase(id);
    purchaseDeleted
      ? (message = `Compra '${id}' eliminada correctamente`) && (status = 200) && (removed = true)
      : (message = `No existe una Compra con el '${id}' para eliminar`) &&
      (status = 404) && (removed = false);

    res.status(status).json({ removed: removed, message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePurchase;
