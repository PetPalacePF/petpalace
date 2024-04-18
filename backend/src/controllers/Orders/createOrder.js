const { Order, Product } = require("../../db");
const findOrderbyId = require("./findOrderbyId");
const modifyOrder = require("./modifyOrder");
const findUserbyId = require("../Users/findUserbyId");
const productsValidator = require("../../utils/validators/orders/productsValidator");
const amountsValidator = require("../../utils/validators/orders/amountsValidator");

const createOrder = async (products, userId) => {
  const id_products = [];
  products.forEach((element) => {
    id_products.push(element[0]);
  });

  try {
    let newOrder;
    const userFound = await findUserbyId(userId);
    const products_db = await Product.findAll({ where: { id: id_products } });
    const existing_products = productsValidator(products_db, id_products);
    const existing_amounts = await amountsValidator(products);


    if (!userFound) {
      return {
        message: `No se pudo crear la Orden. Usuario ${userId} no encontrado.`,
      };
    } else if (existing_products.error) {
      return { message: existing_products.message };
    } else if (existing_amounts.error) {
      return { message: existing_amounts.message };
    }

    const { Orders } = userFound;
    const orders = Orders.map((order) => order.id);
    let openOrder_status = false;
    let openOrder_id = null;
    const orders_db = await Order.findAll({ where: { id: orders } });
    orders_db.forEach((order) => {
      if (order.dataValues.PurchaseId === null) {
        openOrder_status = true;
        openOrder_id = order.dataValues.id;
      }
    });

    if (openOrder_status) {
      const updatedOrder = await modifyOrder(openOrder_id, products);
      return updatedOrder;
    }

    newOrder = await Order.create();
    await newOrder.setUser(userFound);
    for (const product of products) {
      const id_product = product[0];
      let amount = 1;
      if (product.length > 1) {
        amount = product[1];
      }

      await newOrder.addProducts(id_product, {
        through: { cantidad: amount },
      });
    }

    const { id } = newOrder;
    const createdOrder = await findOrderbyId(id);
    return createdOrder.dataValues;
  } catch (error) {
    console.log("error: ", error.message);
    return { message: error.message };
  }
};

module.exports = createOrder;
