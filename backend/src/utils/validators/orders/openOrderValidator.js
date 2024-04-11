const openOrderValidator = (orders_db) => {
  let openOrder = false;
  orders_db.forEach((order) => {
    if (order.dataValues.PurchaseId === null) openOrder = true;
  });

  Order;
  // if (user.Purchases.length > 0) {
  //   return {
  //     error: true,
  //     message: `El cliente ya tiene Orden. Uno de los siguientes Productos no se ha encontrado: '${products}'`,
  //   };
  // }
  // return { error: false };
};

module.exports = openOrderValidator;
