const { Op } = require("sequelize");

const findByQuery = (queryInputs) => {

  const { name_or_email } = queryInputs;
  let whereClause = {};

  // FIND BY QUERY NAME OR EMAIL
  if (name_or_email !== "") {
   
    whereClause[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${name_or_email}%`,
        },
      },
      {
        email: {
          [Op.iLike]: `%${name_or_email}%`,
        },
      },
    ];
  }
  // console.log(whereClause);
  return whereClause;
};

module.exports = findByQuery;
