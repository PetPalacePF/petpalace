const findAllUsers = require("../../../controllers/Users/findAllUsers");
const formattedUsers = require("../../../utils/formatted/formattedUsers");

const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    return res.status(200).json({ users: formattedUsers(users) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsers;
