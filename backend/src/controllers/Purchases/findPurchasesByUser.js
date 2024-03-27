
const { Purchase, Order, User } = require("../../db");

const findPurchasesByUser = async (UserId, query) => {
let purchases;

try {
    purchases = await Purchase.findAll({
    include: [
        {
            model: Order,
            attributes: ['id'], 
        },
        {
            model: User, 
            attributes: ["id", "name", "email"], 
            where: { id: UserId },
        }
    ], 
        order: [['id', query]]
    });


    return purchases;
} catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
}
};

module.exports = findPurchasesByUser;