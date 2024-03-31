const removeOrder = require("../../../controllers/Orders/removeOrder");

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    orderDeleted = await removeOrder(id);
    orderDeleted
      ? (message = `Orden '${id}' eliminada correctamente`)
      : (message = `No existe una Orden con el id '${id}' para eliminar`);

    res.status(200).send(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteOrder;
