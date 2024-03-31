const formattedUsers = (users) => {
  return users.map((user) => {
    const { id, name, email, Orders, Purchases } = user;

    const orders = Orders.map((order) => order.id);
    const purchases = Purchases.map((purchase) => purchase.id);
    
    return {
      id,
      name,
      email,
      orders,
      purchases
    };
  });
};

module.exports = formattedUsers;
