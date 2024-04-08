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
      ? res.status(201).json({ updatedUser: updatedUser })
      : res.status(404).json({
          updatedUser: null,
          message: updatedUser.message,
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putUser;
