const filterByOrders = (queryInputs) => {
  let whereClause = {};
  if (queryInputs && queryInputs.filterOrders.length > 0) {
    const { filterOrders } = queryInputs;
    whereClause = { id: filterOrders };
  }
  return whereClause;
};

module.exports = filterByOrders;
