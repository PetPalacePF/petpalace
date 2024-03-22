const { Purchase, User } = require("../../db");

const updatePurchase = async (purchaseId, orders, newUserId) => {
try {
    const purchase = await Purchase.findByPk(purchaseId);
    
    if (!purchase) {
    console.log("Compra no encontrada");
    return null; 
    }

    if (newUserId) {
    const newUser = await User.findByPk(newUserId);
    if (!newUser) {
        console.log("No se ha asignado un nuevo usuario");
        return null; 
    }
    await purchase.setUser(user);
    }

    await purchase.removeOrders(await purchase.getOrders());

    await purchase.addOrders(orders);

    return purchase;
} catch (error) {
    console.error("Error al actualizar la compra:", error.message);
    throw error; 
}
};

module.exports = updatePurchase;
