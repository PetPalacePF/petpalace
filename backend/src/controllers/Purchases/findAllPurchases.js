const { Purchase, Order, User } = require("../../db");

const findAllPurchases = async () => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: Order,
          attributes: ['id'], 
        },
        {
          model: User, 
          attributes: ["id", "name", "email"], 
        }
      ], 
      order: [['id', 'ASC']]
    });

    return purchases;
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
  }
};

module.exports = findAllPurchases;
