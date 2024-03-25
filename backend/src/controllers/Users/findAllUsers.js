const { User, Order, Purchase } = require("../../db");
const { Op } = require("sequelize");

const findAllUsers = async (query) => {
  let whereClause = {};
  if (query && query !== "") {
    whereClause[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      {
        email: {
          [Op.iLike]: `%${query}%`,
        },
      },
    ];
  }

  try {
    const users = await User.findAll({
      where: whereClause,
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
      order: [['id', 'ASC']]
    });

    
    return users;
  } catch (error) {
    console.error("Error al buscar usuarios:", error.message);
  }
};

module.exports = findAllUsers;
