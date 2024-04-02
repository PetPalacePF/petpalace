
const SortByQuery = (queryInputs) => {
  const { sortId, sortUsers } = queryInputs;

  let orderClause = [];

  if (sortId.toUpperCase() === "ASC" || sortId.toUpperCase() === "DESC") {
    const idClause = ['id', sortId];
    orderClause.push(idClause);
  }

  if (sortUsers.toUpperCase() === "ASC" || sortUsers.toUpperCase() === "DESC") {
    const usersClause = ['user', sortUsers];
    orderClause.push(usersClause);
  }

  return orderClause;
};

module.exports = SortByQuery;
