const removeUser = require("../../../controllers/Users/removeUser");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    const userDeleted = await removeUser(id);
    userDeleted
      ? (message = `Usuario '${id}' eliminado correctamente`)
      : (message = `No existe un Usuario con el id '${id}' para eliminar`);

    res.status(200).send(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;
