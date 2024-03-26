const { User, Order, Purchase } = require("../../db");

const findUserbyId = async (id) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Order,
        attributes: ["id"],
      },
      {
        model: Purchase,
        attributes: ["id"],
      },
    ],
  });
  return user;
};

module.exports = findUserbyId;
