const findAllUsers = require("../../../controllers/Users/findAllUsers");
const formattedUsers = require("../../../utils/formatted/formattedUsers");
const activeInputsValidator = require("../../../utils/validators/users/activeInputsValidator");
const inputValidator = require("../../../utils/validators/users/inputValidator");
const notFoundValidator = require("../../../utils/validators/users/notFoundValidator");
const jsonUsersError = require("../../../utils/validators/users/errors/jsonUsersError");

const getUsers = async (req, res) => {
  const {
    page = 1,
    pageSize = 15,
    name_or_email = "",
    sortId = "",
  } = req.query;
  const paginated = { page, pageSize };
  const queryInputs = {
    name_or_email,
    sortId,
  };
  let users;
  const emptyTable = `No se ha encontrado ningún Usuario registrado en la base de datos`;

  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    const message = jsonUsersError(queryError.message);
    return res.status(404).json(message);
  }
  const inputsActive = activeInputsValidator(queryInputs);

  try {
    if (inputsActive) {
      users = await findAllUsers(paginated, queryInputs);
      if (users.totalResults === 0) {
        const notFound_Products = notFoundValidator(queryInputs);
        const message = jsonUsersError(notFound_Products);
        return res.status(404).json(message);
      }
    } else {
      users = await findAllUsers(paginated);
      if (users.totalResults === 0) {
        const message = jsonUsersError(emptyTable);
        return res.status(404).json(message);
      }
    }

    const {
      totalResults,
      totalPages,
      currentPage,
      pageSize,
      usersDB,
      status,
      message,
    } = users;

    const usersResult = formattedUsers(usersDB);
    return res.status(status).json({
      totalResults: totalResults,
      totalPages: totalPages,
      currentPage: currentPage,
      pageSize: pageSize,
      orders: usersResult,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUsers;
