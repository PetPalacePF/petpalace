const formattedOrders = (orders) => {
  const formatted = orders.map((order) => {
    const { id, Products, User, Purchase } = order;
    return { id, Products, User, Purchase };
  });

  return formatted;
};

module.exports = formattedOrders;
