const formattedOrder = (order) => {
  const { id, Products, User, Purchase } = order;
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
};

module.exports = formattedOrder;
