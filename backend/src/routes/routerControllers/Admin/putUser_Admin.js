const modifyUser = require("../../../controllers/Users/modifyUser");
const findUserbyId = require("../../../controllers/Users/findUserbyId");

const putUser_Admin = async (req, res) => {
  const {
    userAdmin_id,
    id,
    admin,
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
      message: "Se necesitan permisos de Admin para ingresar",
    });
  }

  const userRequesting = await findUserbyId(userAdmin_id);
  const adminPermissions = userRequesting.admin;
  console.log(adminPermissions);

  const userBody = {
    admin,
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
      return res
        .status(500)
        .json({
          error: `Ya existe un usuario registrado con el mail '${email}', por favor ingresá un email diferente para actualizar.`,
        });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = putUser_Admin;
