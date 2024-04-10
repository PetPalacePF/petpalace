const createUser = require("../../../controllers/Users/createUser");

const postUser = async (req, res) => {
  const { email, name } = req.body;
  const message = `Para crear un usuario es necesario indicar un email.`

  if(!email || email === ""){
    return res.status(400).json({ created: false, error: message });
  }

  try {
    const {user, created} = await createUser(email, name);
    res.status(201).json({ created: created, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
