const formattedUsers = (users) => {
  return users.map((user) => {
    const {
      id,
      admin,
      enabled,
      name,
      email,
      Orders,
      Purchases,
      country,
      state,
      city,
      street_address,
      street_number,
      ZIP_Code,
      phone,
    } = user;

    const orders = Orders.map((order) => order.id);
    const purchases = Purchases.map((purchase) => purchase.id);

    return {
      id,
      admin,
      enabled,
      name,
      email,
      orders,
      purchases,
      country,
      state,
      city,
      street_address,
      street_number,
      ZIP_Code,
      phone,
    };
  });
};

module.exports = formattedUsers;
