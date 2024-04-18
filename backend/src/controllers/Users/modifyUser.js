const { User } = require("../../db");
const findUserbyId  = require("./findUserbyId");
const { OWNER_EMAIL, OWNER_NAME } = require("../../adminCredentials");


const modifyUser = async (id, userBody) => {
  const { email, name } = userBody;
  const user = await findUserbyId(id);

  if (user && user.email === OWNER_EMAIL) return  { message: `Los datos del Administrador no pueden ser modificados por este medio.` };
  
  
  try {
    let updatedUser = await User.update(userBody, { where: { id: id } });
    if (updatedUser[0] === 0) {
      return { message: `Usuario '${id}' no encontrado` };
    }
    updatedUser = await findUserbyId(id);
    return updatedUser.dataValues;
  } catch (error) {
    console.log(`Error al actualizar el usuario ${id}: `, error.message);
  }
};

module.exports = modifyUser;
