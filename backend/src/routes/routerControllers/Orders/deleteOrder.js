const removeOrder = require("../../../controllers/Orders/removeOrder");

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    let status;
    let removed;
    const orderDeleted = await removeOrder(id);
    orderDeleted
      ? (message = `Orden '${id}' eliminada correctamente`) && (status = 200) && (removed = true)
      : (message = `No existe una Orden con el id '${id}' para eliminar`) &&
        (status = 404) && (removed = false);

    res.status(status).json({ removed: removed, message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteOrder;
