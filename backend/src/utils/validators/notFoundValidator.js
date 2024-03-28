const notFoundValidator = async (queryInputs) => {
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
    return {
      message: `No se ha encontrado ningun Producto que coincida con la palabra '${brand_or_name}'`,
      brand_or_name: brand_or_name,
    };
  }
  
  if (filterCategories.length > 0) {
    return {
      message: `No se ha encontrado ninguna Categoria que coincida con los siguientes id: '${filterCategories}'`,
      filterCategories: filterCategories,
    };
  }

  if (filterPrice instanceof Array && filterPrice.length === 2) {
    return {
      message: `No se ha encontrado ningun precio que coincida entre los siguientes valores: '${filterPrice}'`,
      filterPrice: filterPrice,
    };
  } else if (filterPrice instanceof Array && filterPrice.length > 2) {
    return {
      message: `Debe ingresar únicamente dos valores para utilizar el filtrado por precios.`,
      filterPrice: filterPrice,
    };
  } else {
    return {
      message: `Debe ingresar dos valores para utilizar el filtrado por precios`,
      filterPrice: filterPrice,
    };
  }
};

module.exports = notFoundValidator;
