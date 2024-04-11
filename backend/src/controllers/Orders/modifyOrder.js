const { Product } = require("../../db");
const findOrderbyId = require("../../controllers/Orders/findOrderbyId");
const productsValidator = require("../../utils/validators/orders/productsValidator");
const amountsValidator = require("../../utils/validators/orders/amountsValidator");

const modifyOrder = async (id, productsToAdd, productsToRemove) => {
  const id_products = [];
  productsToAdd.forEach((element) => {
    id_products.push(element[0]);
  });

  const products_db = await Product.findAll({ where: { id: id_products } });
  const existing_products = productsValidator(products_db, id_products);
  const existing_amounts = await amountsValidator(productsToAdd);

  if (existing_products.error) {
    return { message: existing_products.message };
  } else if (existing_amounts.error) {
    return { message: existing_amounts.message };
  }

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
