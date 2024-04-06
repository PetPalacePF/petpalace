const removeCategory = require("../../../controllers/Categories/removeCategory");

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    let status;
    const categoryDeleted = await removeCategory(id);
    categoryDeleted
      ? (message = `Categoria '${id}' eliminada correctamente`) &&
        (status = 200)
      : (message = `No existe una Categoria con el id '${id}' para eliminar`) &&
        (status = 404);
    res.status(status).send(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategory;
