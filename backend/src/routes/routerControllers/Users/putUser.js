const modifyUser = require("../../../controllers/Users/modifyUser");

const putUser = async (req, res) => {
  const { id, name, email } = req.body;

  try {
    const updatedUser = await modifyUser(id, name, email);
    updatedUser.hasOwnProperty('name')
      ? res.status(201).json(updatedUser)
      : res.status(404).send(updatedUser.message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putUser;
