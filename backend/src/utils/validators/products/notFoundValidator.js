const notFoundValidator = (queryInputs) => {
  const {
    brand_or_name,
    page,
    pageSize,
    filterCategories,
    filterPrice,
    sortName,
    sortBrand,
    sortPrice,
    sortRating,
  } = queryInputs;
  
  if (brand_or_name !== "") {
    return `No se ha encontrado ningun Producto que coincida con la palabra '${brand_or_name}'`;
  }

  if (filterCategories.length > 0) {
    return `No se ha encontrado ninguna Categoria que coincida con los siguientes id: '${filterCategories}'`;
  }

  if (filterPrice instanceof Array && filterPrice.length === 2) {
    return `No se ha encontrado ningun precio que coincida entre los siguientes valores: '${filterPrice}'`;
  } else if (filterPrice instanceof Array && filterPrice.length > 2) {
    return `Debe ingresar únicamente dos valores para utilizar el filtrado por precios.`;
  } else if (filterPrice instanceof Array && filterPrice.length === 1) {
    return `Debe ingresar dos valores para utilizar el filtrado por precios`;
  }

  
  if (sortBrand !== "") {
    return `La tabla de productos se encuentra actualmente vacía, no hay productos para ordenar por marca.`;
  }

  if (sortName !== "") {
    return `La tabla de productos se encuentra actualmente vacía, no hay productos para ordenar por nombre.`;
  }

  if (sortPrice !== "") {
    return `La tabla de productos se encuentra actualmente vacía, no hay productos para ordenar por precio.`;
  }

  if (sortRating !== "") {
    return `La tabla de productos se encuentra actualmente vacía, no hay productos para ordenar por rating.`;
  }
};

module.exports = notFoundValidator;
