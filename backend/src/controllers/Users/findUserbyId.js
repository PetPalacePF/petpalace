const { User } = require("../../db");


const findUserbyId = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = findUserbyId;