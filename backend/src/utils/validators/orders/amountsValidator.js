const findProductbyId = require("../../../controllers/Products/findProductbyId");

const amountsValidator = async (products) => {
  for (const product of products) {
    const id_product = product[0];
    let amount = 1;
    if (product.length > 1) {
      amount = product[1];
    }

    const product_aux = await findProductbyId(id_product);
    if (product_aux) {
      const { stock } = product_aux;
      const stockValidator = stock > amount;
      if (!stockValidator) {
        return {
          error: true,
          message: `No se pudo crear la orden. El producto '${id_product}' tiene un stock máximo de '${stock}'. Actualmente se están solicitando '${amount}', por favor corregir la cantidad solicitada.`,
        };
      }
    }
  }
  return { error: false };
};

module.exports = amountsValidator;
