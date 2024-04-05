const { Order, User } = require("../../db");

const createOrder = async (products, userId) => {
  try {
    let newOrder;

    // Asignar el usuario a la orden
    const user = await User.findByPk(userId);
    if (user) {
      newOrder = await Order.create();
      await newOrder.setUser(user);
    } else {
      return (newOrder = {
        message: `No se pudo crear la Orden. Usuario ${userId} no encontrado`,
      });
    }

    // Agregar productos a la orden
    console.log(products);
    for (const product of products) {
      product.length === 2 &&
      await newOrder.addProducts(product[0], { through: { cantidad: product[1] } });
    }

    return newOrder.dataValues;
  } catch (error) {
    console.log("error: ", error.message);
    return { message: error.message };
  }
};

module.exports = createOrder;
