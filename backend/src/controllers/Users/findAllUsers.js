const { User, Order, Purchase } = require("../../db");

const findAllUsers = async () => {
  try {
    const users = await User.findAll({
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

    return users;
  } catch (error) {
    console.error("Error al buscar usuarios:", error.message);
  }
};

module.exports = findAllUsers;
