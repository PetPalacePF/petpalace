const removeCategory = require("../../../controllers/Categories/removeCategory");

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    categoryDeleted = await removeCategory(id);
    categoryDeleted
      ? (message = `Categoria '${id}' eliminada correctamente`)
      : (message = `No existe una Categoria con el id '${id}' para eliminar`);

    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategory;
