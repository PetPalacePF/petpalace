const filterByUsers = (queryInputs) => {
  let whereClause = {};
  if (queryInputs && queryInputs.filterUsers.length > 0) {
    const { filterUsers } = queryInputs;
    whereClause = { id: filterUsers };
  }
  return whereClause;
};

module.exports = filterByUsers;
