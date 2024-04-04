const formattedOrder = (order) => {
  const { id, Products, User, Purchase } = order;

  return { id, Products, User, Purchase };
};

module.exports = formattedOrder;
