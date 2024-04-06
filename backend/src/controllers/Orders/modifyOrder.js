const findOrderbyId = require("../../controllers/Orders/findOrderbyId");

const modifyOrder = async (id, productsToAdd, productsToRemove) => {
  try {
    let updatedOrder = await findOrderbyId(id);

    if (updatedOrder) {
      if (updatedOrder.dataValues.PurchaseId === null) {
        // Agregar nuevos productos
        if (productsToAdd) {
          for (const product of productsToAdd) {
            if (product.length === 2) {
              await updatedOrder.addProducts(product[0], {
                through: { cantidad: product[1] },
              });
            } else if (product.length === 1) {
              await updatedOrder.addProducts(product[0], {
                through: { cantidad: 1 },
              });
            }
          }
        }

        // Eliminar productos
        if (productsToRemove) {
          for (const product of productsToRemove) {
            await updatedOrder.removeProducts(product);
          }
        }

        // Actualizar la orden
        updatedOrder = (await findOrderbyId(id)).dataValues;
      } else {
        updatedOrder = {
          message: `La Orden ${id} ya fue finalizada no se puede modificar, esta asignada a la Compra ${updatedOrder.dataValues.PurchaseId}`,
        };
      }
    } else {
      updatedOrder = { message: `Orden ${id} no encontrada` };
    }

    return updatedOrder;
  } catch (error) {
    console.log(`Error al actualizar la orden ${id}: `, error.message);
  }
};

module.exports = modifyOrder;
