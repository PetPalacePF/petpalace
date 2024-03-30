
const SortByQuery = (queryInputs) => {
  const { sortId } = queryInputs;

  let orderClause = [];

  if (sortId.toUpperCase() === "ASC" || sortId.toUpperCase() === "DESC") {
    const idClause = ['id', sortId];
    orderClause.push(idClause);
  }

  return orderClause;
};

module.exports = SortByQuery;
