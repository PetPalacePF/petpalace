const { Order, Product, User, Purchase } = require("../../db");

const findOrdersByUser = async (UserId, query) => {
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
        where: { id: UserId },
        },
        {
        model: Purchase, 
        attributes: ["id"], 
        },
    ],
    order: [['id', query]]
    });

    return orders;
} catch (error) {
    console.error("Error al buscar órdenes:", error);
    throw error;
}
};

module.exports = findOrdersByUser;