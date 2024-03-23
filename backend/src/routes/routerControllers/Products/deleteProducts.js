const removeProduct = require("../../../controllers/Products/removeProduct");

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    productDeleted = await removeProduct(id);
    productDeleted
      ? (message = `Producto '${id}' eliminado correctamente`)
      : (message = `No existe un Producto con el id '${id}' para eliminar`);

    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProducts;
