const formattedOrders = (order) => {
  const { id, Products, User, Purchase } = order;
  const products = Products.map((product) => product.name);
  return { id, products, User, Purchase };
};

module.exports = formattedOrders;
