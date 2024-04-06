const removeUser = require("../../../controllers/Users/removeUser");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let message;
    let status;

    const userDeleted = await removeUser(id);
    userDeleted
      ? (message = `Usuario '${id}' eliminado correctamente`) && (status = 200)
      : (message = `No existe un Usuario con el id '${id}' para eliminar`) && (status = 404);

    res.status(status).json({message: message});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;
