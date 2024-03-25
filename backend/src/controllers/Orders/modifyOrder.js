const findOrderbyId = require("../../controllers/Orders/findOrderbyId");

const modifyOrder = async (id, products) => {
  try {
    let updatedOrder = await findOrderbyId(id);

    updatedOrder
      ? updatedOrder.dataValues.PurchaseId === null
        ? (await updatedOrder.setProducts(products),
          (updatedOrder = (await findOrderbyId(id)).dataValues))
        : (updatedOrder = {
            message: `La Orden ${id} ya fue finalizada no se puede modificar, esta asignada a la Compra ${updatedOrder.dataValues.PurchaseId}`,
          })
      : (updatedOrder = { message: `Orden ${id} no encontrada` });

    return updatedOrder;
  } catch (error) {
    console.log(`Error al actualizar la orden ${id}: `, error.message);
  }
};

module.exports = modifyOrder;
