const formattedPurchases = (purchase) => {
  const { id, Orders, User, stripe_payment_id, stripe_payment_status } = purchase;
  const orders = Orders.map((order) => {
    return {id: order.id}
  });
  return { id, orders, User, stripe_payment_id, stripe_payment_status };
};

module.exports = formattedPurchases;
