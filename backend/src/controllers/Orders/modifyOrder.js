const { Order, User } = require("../../db");

const updateOrder = async (orderId, products, newUserId) => {
    try {
    const order = await Order.findByPk(orderId);
    if (!order) {
    console.log("Orden no encontrada");
    return null; 
    }

    if (newUserId) {
    const newUser = await User.findByPk(newUserId);
    if (!newUser) {
        console.log("No se ha asignado un nuevo usuario");
        return null; 
    }
    await order.setUser(newUser);
    }

    await order.removeProducts(await order.getProducts());

    await order.addProducts(products);

    return order;
} catch (error) {
    console.error("Error al actualizar la orden:", error.message);
    throw error; 
}
};

module.exports = updateOrder;
