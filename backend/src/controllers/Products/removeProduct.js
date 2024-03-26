const { Product } = require("../../db");

const removeProduct = async (id) => {
  try {
    productDestroyed = await Product.destroy({
      where: { id: id },
    });
    return productDestroyed;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}: ${error.message}`);
  }
};

module.exports = removeProduct;
