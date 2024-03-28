
const { Purchase, Order, User } = require("../../db");

const findAllPurchases = async (query) => {
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

module.exports = findAllPurchases;
