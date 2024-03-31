const { Purchase, User } = require("../../db");

const createPurchase = async (orders, userId) => {
  try {
    let newPurchase;

    // Asignar el usuario a la compra
    const user = await User.findByPk(userId);
    if (user) {
      newPurchase = await Purchase.create();
      await newPurchase.setUser(user);
    } else {
      return (newPurchase = {
        message: `No se pudo crear la Compra. Usuario ${userId} no encontrado.`,
      });
    }

    // Agregar ordenes a la compra
    await newPurchase.addOrders(orders);

    return newPurchase.dataValues;
  } catch (error) {
    console.error("Error al crear la compra:", error.message);
  }
};

module.exports = createPurchase;
