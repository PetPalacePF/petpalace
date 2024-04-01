const formattedOrders = (orders) => {
  const formatted = orders.map((order) => {
    const { id, Products, User, Purchase } = order;
    const products = Products.map((product) => product.id);
    return { id, products, User, Purchase };
  });

  return formatted;
};

module.exports = formattedOrders;
