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
      order: [['id', 'ASC']]
    });

    if(query==="ASC") {
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
        order: [['id', 'ASC']]
      });
    }else if(query==="DESC") {
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
        order: [['id', 'DESC']]
      });
    }

    return purchases;
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
  }
};

module.exports = findAllPurchases;
