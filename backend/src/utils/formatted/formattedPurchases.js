const formattedPurchases = (purchases) => {
  const formatted = purchases.map((purchase) => {
    const { id, Orders, User, stripe_payment_id, stripe_payment_status } = purchase;
    // const orders = Orders.map((order) => order.id);
    return { id, Orders, User, stripe_payment_id, stripe_payment_status };
  });

  return formatted;
};

module.exports = formattedPurchases;
