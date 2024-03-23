const { Purchase } = require("../../db");

const removePurchase = async (id) => {
  try {
    purchaseDestroyed = await Purchase.destroy({
      where: { id: id },
    });
    return purchaseDestroyed;
  } catch (error) {
    console.error(`Error al eliminar compra ${id}: ${error.message}`);
  }
};

module.exports = removePurchase;
