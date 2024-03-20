const { Purchase, User } = require("../../db");

const createPurchase = async (orders, userId) => {
  try {
    const newPurchase = await Purchase.create();

    // Asignar el usuario a la orden
    const user = await User.findByPk(userId);
    user
      ? await newPurchase.setUser(user)
      : console.log("Usuario no encontrado");

    // Agregar ordenes a la compra
    await newPurchase.addOrders(orders);
    return newPurchase;
  } catch (error) {
    console.error("Error al crear la compra:", error.message);
  }
};

module.exports = createPurchase;
