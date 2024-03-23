const removeUser = require("../../../controllers/Users/removeUser");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    userDeleted = await removeUser(id);

    res.status(200).json({ userDeleted: userDeleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteUser;
