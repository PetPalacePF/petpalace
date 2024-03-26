const filterByCategories = async (queryInputs) => {
  let whereClause = {};
  if (queryInputs && queryInputs.filterCategories.length > 0) {
    const { filterCategories } = queryInputs;
    whereClause = { id: filterCategories };
  }
  return whereClause;
};

module.exports = filterByCategories;
