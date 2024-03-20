const createUser = require("../../../controllers/Users/createUser");

const postUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUser = await createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
