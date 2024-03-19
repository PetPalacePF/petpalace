const getUsers = async (req, res) => {
  try {
    return res.send("PETPALACE - TEST USERS '/users'");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsers;
