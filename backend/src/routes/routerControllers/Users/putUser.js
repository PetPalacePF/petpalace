const modifyUser = require("../../../controllers/Users/modifyUser");

const putUser = async (req, res) => {
  const {
    id,
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

  const userBody = {
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

module.exports = putUser;
