const existingOrders = (orders_db, orders) => {
  const ordersQuantityValidator = orders_db.length === orders.length;
  const nullPurchaseValidator = orders_db.some((orden) => orden.PurchaseId);

  if (!ordersQuantityValidator) {
    return {
      error: true,
      message: `No se pudo crear la Compra. Una de las siguientes Ordenes no se ha encontrado: '${orders}'`,
    };
  }

  if (nullPurchaseValidator) {
    const orderWithPurchase = orders_db.find((orden) => orden.PurchaseId);
    return {
      error: true,
      message: `La orden '${orderWithPurchase.id}' ya tiene una compra asignada. Por favor introduce únicamente ordenes sin compras asignadas.`,
    };
  }

  return { error: false };
};

module.exports = existingOrders;
