const formattedPurchases = (purchase) => {
  const { id, Orders, User } = purchase;
  const orders = Orders.map((order) => order.id);
  return { id, orders, User };
};

module.exports = formattedPurchases;
