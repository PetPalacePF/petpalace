const findUserbyId = require("../../../controllers/Users/findUserbyId");
const formattedUser = require("../../../utils/formatted/formattedUser");


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserbyId(id);
    return user
    ?  res.status(200).json({user: formattedUser(user)})
    :  res.status(404).json({
      user: user,
      message : `No existe el usuario con id: ${id}`});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserById;
