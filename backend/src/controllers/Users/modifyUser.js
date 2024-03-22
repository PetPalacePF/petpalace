const { User } = require("../../db");

const modifyUser = async (id,name, email) => {
const updatedUser = await User.update({ name, email }, { where: { id: id } });
return updatedUser;
};

module.exports = modifyUser;