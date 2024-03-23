const { User, Order, Purchase } = require("../../db");

const removeUser = async (id) => {
  try {
    userDestroyed = await User.destroy({
      where: { id: id },
      include: [Order, Purchase],
    });
    return userDestroyed;
  } catch (error) {
    console.error(`Error al eliminar usuario ${id}: ${error.message}`);
  }
};

module.exports = removeUser;
