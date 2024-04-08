const formattedUser = (user) => {
  const {
    id,
    name,
    email,
    Orders,
    Purchases,
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
};

module.exports = formattedUser;
