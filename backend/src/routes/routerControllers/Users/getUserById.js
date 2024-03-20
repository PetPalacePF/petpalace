const findUserbyId = require("../../../controllers/Users/findUserbyId");


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserbyId(id);
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUserById;
