const { User } = require("../../db");

const createUser = async (email, name) => {

  const [user, created] = await User.findOrCreate({
    where: { email }, 
    defaults: { email, name } 
  });

  return {user, created};
};

module.exports = createUser;
