const formattedUsers = (users) => {
  return users.map((user) => {
    const {
      id,
      userName,
      email,
      Orders,
      Purchases,
      name,
      country,
      state,
      city,
      street_address,
      ZIP_Code,
      phone,
    } = user;

    const orders = Orders.map((order) => order.id);
    const purchases = Purchases.map((purchase) => purchase.id);

    return {
      id,
      name,
      email,
      orders,
      purchases,
      country,
      state,
      city,
      street_address,
      ZIP_Code,
      phone,
    };
  });
};

module.exports = formattedUsers;
