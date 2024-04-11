const productsValidator = (products_db, products) => {
  const productsQuantityValidator = products_db.length === products.length;

  if (!productsQuantityValidator) {
    return {
      error: true,
      message: `No se pudo crear o actualizar la Orden. Uno de los siguientes Productos no se ha encontrado: '${products}'`,
    };
  }
  return { error: false };
};

module.exports = productsValidator;
