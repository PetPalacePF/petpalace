const { User } = require("../../db");

const modifyUser = async (
  id,
  name,
  email,
  country,
  state,
  city,
  street_address,
  ZIP_Code,
  phone
) => {
  try {
    let updatedUser = await User.update(
      { name, email, country, state, city, street_address, ZIP_Code, phone },
      { where: { id: id } }
    );
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
