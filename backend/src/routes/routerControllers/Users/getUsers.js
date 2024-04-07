const findAllUsers = require("../../../controllers/Users/findAllUsers");
const formattedUsers = require("../../../utils/formatted/formattedUsers");

const getUsers = async (req, res) => {
  const { name_or_email = "" } = req.query;

  let users;

  try {
    name_or_email !== ""
      ? (users = await findAllUsers(name_or_email))
      : (users = await findAllUsers());

    users = formattedUsers(users);
    if (users.length > 0) {
      return res
        .status(200)
        .json({
          totalResults: 0,
          totalPages: 0,
          currentPage: 0,
          pageSize: 0,
          users: users,
          message: "message",
        });
    } else if (name_or_email !== "") {
      return res.status(404).json({
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        users: users,
        message: `No se ha encontrado ningun Usuario que coincida con la palabra '${name_or_email}'`,
      });
    } else {
      return res.status(404).json({
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        users: users,
        message: `No se ha encontrado ningun Usuario registrado en la base de datos`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsers;
