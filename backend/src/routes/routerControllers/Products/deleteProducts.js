const removeProduct = require("../../../controllers/Products/removeProduct");

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    let status;

    const productDeleted = await removeProduct(id);
    productDeleted
      ? (message = `Producto '${id}' eliminado correctamente`) && (status = 200)
      : (message = `No existe un Producto con el id '${id}' para eliminar`) && (status = 400);

    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProducts;
