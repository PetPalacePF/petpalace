const { Order } = require("../../db");

const removeOrder = async (id) => {
  try {
    orderDestroyed = await Order.destroy({
      where: { id: id },
    });
    return orderDestroyed;
  } catch (error) {
    console.error(`Error al eliminar orden ${id}: ${error.message}`);
  }
};

module.exports = removeOrder;
