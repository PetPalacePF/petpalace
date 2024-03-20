const { Order, Product, User, Purchase } = require("../../db");

const findAllOrders = async (query) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: User, 
          attributes: ["id", "name", "email"], 
        },
        {
          model: Purchase, 
          attributes: ["id"], 
        },
      ],
    });

    return orders;
  } catch (error) {
    console.error("Error al buscar órdenes:", error);
    throw error;
  }
};

module.exports = findAllOrders;
