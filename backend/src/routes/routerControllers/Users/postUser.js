const createUser = require("../../../controllers/Users/createUser");

const postUser = async (req, res) => {
  const { email, name } = req.body;
  const message = `Para crear un usuario es necesario indicar un email.`

  if(!email || email === ""){
    return res.status(400).json({ user: null,  created: null, error: message });
  }

  try {
    const {user, created} = await createUser(email, name);
    res.status(201).json({ user: user,  created: created});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postUser;
