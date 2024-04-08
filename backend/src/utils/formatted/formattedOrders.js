const formattedOrders = (orders) => {
  return orders.map(({ id, Products, User, Purchase }) => {
    const products = Products.map(({ id, brand, name, price, stock, img, Order_Product }) => ({
      id,
      brand,
      name,
      price,
      stock,
      img,
      cantidad: Order_Product.cantidad
    }));

    return { id, products, User, Purchase };
  });
};

module.exports = formattedOrders;
