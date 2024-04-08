const { User, Order, Purchase } = require("../../db");
const { Op } = require("sequelize");
const findByQuery = require("./users_utils/findByQuery");
const findAll_returnValidator = require("../../utils/validators/users/findAll_returnValidator");

const findAllUsers = async (paginated, queryInputs) => {
  let whereClause = {};
  const { page, pageSize } = paginated;
  const offset = (page - 1) * pageSize;

  if (queryInputs) {
    whereClause = findByQuery(queryInputs);
  }

  const users = await User.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Order,
        attributes: ["id"],
      },
      {
        model: Purchase,
        attributes: ["id"],
      },
    ],
    order: [["id", "ASC"]],
    limit: pageSize,
    offset: offset,
  });

  const { count, rows } = users;
  const totalPages = Math.ceil(count / pageSize);
  const { message, status } = findAll_returnValidator(rows, page, totalPages);

  return {
    totalResults: count,
    totalPages: totalPages,
    currentPage: page,
    pageSize: pageSize,
    usersDB: rows,
    message: message,
    status: status,
  };
};

module.exports = findAllUsers;
