const { Order, User } = require("../../db");

const createOrder = async (products, userId) => {
  try {
    const newOrder = await Order.create();

    // Asignar el usuario a la orden
    const user = await User.findByPk(userId);
    user
      ? await newOrder.setUser(user)
      : console.log("Usuario no encontrado");

    // Agregar productos a la orden
    await newOrder.addProducts(products);
    return newOrder;
  } catch (error) {
    console.error("Error al crear la orden:", error.message);
  }
};

module.exports = createOrder;
