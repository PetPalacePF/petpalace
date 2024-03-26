const { Purchase, Order, User } = require("../../db");

const findPurchasebyId = async (id) => {
  const purchase = await Purchase.findByPk(id, {
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
  });
  return purchase;
};

module.exports = findPurchasebyId;