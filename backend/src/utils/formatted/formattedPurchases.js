const formattedPurchases = (purchases) => {
  const formatted = purchases.map((purchase) => {
    const { id, Orders, User } = purchase;
    const orders = Orders.map((order) => order.id);
    return { id, orders, User };
  });

  return formatted;
};

module.exports = formattedPurchases;
