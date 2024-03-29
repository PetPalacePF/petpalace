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

  if (
    (brand_or_name !== "" &&
      filterCategories.length > 0 &&
      filterPrice.length === 2) ||
    (brand_or_name !== "" && filterCategories.length > 0) ||
    (brand_or_name !== "" && filterPrice.length > 0) ||
    (filterCategories.length > 0 && filterPrice.length > 0)
  ) {
    return `No existen resultados para esa combinación de valores en los filtros.`;
  }

  if (brand_or_name !== "") {
    return `No se ha encontrado ningún Producto que contenga una marca o nombre que coincida con la palabra '${brand_or_name}'`;
  }

  if (filterCategories.length > 0) {
    return `No se ha encontrado ningún Producto que contenga una categoría que coincida con los siguientes id: '${filterCategories}'`;
  }

  if (filterPrice instanceof Array && filterPrice.length === 2) {
    return `No se ha encontrado ningún Producto que contenga un precio que coincida entre los siguientes valores: '${filterPrice}'`;
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
