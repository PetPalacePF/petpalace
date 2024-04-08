const { Order, User } = require("../../db");
const findOrderbyId = require("./findOrderbyId");

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
    for (const product of products) {
      if (product.length === 2) {
        await newOrder.addProducts(product[0], {
          through: { cantidad: product[1] },
        });
      } else if (product.length === 1){
        await newOrder.addProducts(product[0], {
          through: { cantidad: 1 },
        });
      }
    }
const {id} = newOrder
console.log(id);
    const createdOrder = await findOrderbyId(id);
    return createdOrder;
  } catch (error) {
    console.log("error: ", error.message);
    return { message: error.message };
  }
};

module.exports = createOrder;
