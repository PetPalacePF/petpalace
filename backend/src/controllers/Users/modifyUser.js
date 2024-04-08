const { User } = require("../../db");

const modifyUser = async (id, userBody) => {
  try {
    let updatedUser = await User.update(userBody, { where: { id: id } });
    if (updatedUser[0] === 0) {
      return { message: `Usuario '${id}' no encontrado` };
    }
    updatedUser = await User.findByPk(id);
    return updatedUser.dataValues;
  } catch (error) {
    console.log(`Error al actualizar el usuario ${id}: `, error.message);
  }
};

module.exports = modifyUser;
