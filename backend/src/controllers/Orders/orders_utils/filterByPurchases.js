const filterByPurchases = (queryInputs) => {
  let whereClause = {};
  if (queryInputs && queryInputs.filterPurchases.length > 0) {
    const { filterPurchases } = queryInputs;
    whereClause = { id: filterPurchases };
  }
  return whereClause;
};

module.exports = filterByPurchases;
