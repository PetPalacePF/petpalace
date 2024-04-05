const { Order, Product, User, Purchase } = require("../../db");

const findOrderbyId = async (id) => {
  const order = await Order.findByPk(id, {
    include: [
      {
        model: Product,
        attributes: ["id", "brand", "name", "price", "stock", "img"],
        through: {
          attributes: [],
        },
      },
      {
        model: User, 
        attributes: ["id", "name", "email"], 
      },
      {
        model: Purchase, 
        attributes: ["id"], 
      },
    ],
  });
  return order;
};

module.exports = findOrderbyId;