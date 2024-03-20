const { User } = require("../../db");

const createUser = async (name, email) => {
  const newUser = await User.create(name, email);
  return newUser;
};

module.exports = createUser;
