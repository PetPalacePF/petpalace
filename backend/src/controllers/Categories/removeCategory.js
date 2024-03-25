const { Category } = require("../../db");

const removeCategory = async (id) => {
  try {
    categoryDestroyed = await Category.destroy({
      where: { id: id },
    });
    return categoryDestroyed;
  } catch (error) {
    console.error(`Error al eliminar categoria ${id}: ${error.message}`);
  }
};

module.exports = removeCategory;
