const { Purchase, User, Order } = require("../../db");
const findPurchasebyId = require("./findPurchasebyId");
const findOrderbyId = require("../Orders/findOrderbyId");
const existing_orders = require("../../utils/validators/purchases/existing_orders");
const formattedOrder = require("../../utils/formatted/formattedOrder");
const formattedPurchase = require("../../utils/formatted/formattedPurchase");

const createPurchase = async (
  orders,
  userId,
  stripe_payment_id,
  stripe_payment_status
) => {
  const stripeData = { stripe_payment_id, stripe_payment_status };

  let newPurchase;

  const userFound = await User.findByPk(userId);
  const orders_db = await Order.findAll({ where: { id: orders } });
  const ordersValidator = existing_orders(orders_db, orders);

  if (!userFound) {
    return {
      message: `No se pudo crear la Compra. Usuario ${userId} no encontrado.`,
    };
  } else if (ordersValidator.error) {
    return { message: ordersValidator.message };
  }

  newPurchase = await Purchase.create(stripeData);
  await newPurchase.setUser(userFound);
  await newPurchase.addOrders(orders);
  const { id } = newPurchase;
  const createdPurchase = formattedPurchase(await findPurchasebyId(id));

  if (createdPurchase) {
    const { orders } = createdPurchase;
    newPurchase = createdPurchase;
    newPurchase.orders = [];
    for (const order of orders) {
      const orderData = formattedOrder(await findOrderbyId(order.id));
      const { products } = orderData;
      newPurchase.orders = [...newPurchase.orders, { id: order.id, products }];
    }
  }

  return newPurchase;
};

module.exports = createPurchase;
