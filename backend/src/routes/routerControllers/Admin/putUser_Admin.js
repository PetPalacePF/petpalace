const modifyUser = require("../../../controllers/Users/modifyUser");
const findUserbyId = require("../../../controllers/Users/findUserbyId");
const ownerRoleValidator = require("../../../utils/validators/admin/ownerRoleValidator");

const putUser_Admin = async (req, res) => {
  const {
    userAdmin_id,
    id,
    admin,
    enabled,
    name,
    email,
    country,
    state,
    city,
    street_address,
    street_number,
    ZIP_Code,
    phone,
  } = req.body;

  if (!userAdmin_id) {
    return res.status(404).json({
      updated: false,
      message: "No se está recibiendo un id_admin",
    });
  }
  const userRequesting = await findUserbyId(userAdmin_id);
  if (!userRequesting) {
    return res.status(404).json({
      updated: false,
      message: `No se encontro el Adminitrador con id '${userAdmin_id}'`,
    });
  }
  const ownerRole = ownerRoleValidator(userRequesting);
  if (ownerRole.error) {
    return res.status(404).json({
      updated: false,
      message: ownerRole.message,
    });
  }

  const userBody = {
    admin,
    enabled,
    name,
    email,
    country,
    state,
    city,
    street_address,
    street_number,
    ZIP_Code,
    phone,
  };

  try {
    const updatedUser = await modifyUser(id, userBody);
    updatedUser.hasOwnProperty("name")
      ? res.status(201).json({ updated: true, user: updatedUser })
      : res.status(404).json({
          updated: false,
          message: updatedUser.message,
        });
  } catch (error) {
    if (
      error.message ===
      "Cannot read properties of undefined (reading 'hasOwnProperty')"
    ) {
      return res.status(500).json({
        updated: false,
        error: `Ya existe un usuario registrado con el mail '${email}', por favor ingresá un email diferente para actualizar.`,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = putUser_Admin;
