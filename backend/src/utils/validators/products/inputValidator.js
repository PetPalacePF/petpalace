const inputValidator = (queryInputs) => {
  const { filterPrice, sortBrand, sortId, sortName, sortPrice, sortRating } =
    queryInputs;

  const query = {
    error: false,
    message: "",
  };

  if (!(filterPrice instanceof Array)) {
    query.error = true;
    query.message = `Debe ingresar dos valores para utilizar el filtrado por precios`;
  } else if (filterPrice.length > 2) {
    query.error = true;
    query.message = `Debe ingresar únicamente dos valores para utilizar el filtrado por precios.`;
  }

  if (
    sortBrand !== "" &&
    sortBrand.toUpperCase() !== "ASC" &&
    sortBrand.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por marca son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortBrand}'`;
  }

  if (
    sortId !== "" &&
    sortId.toUpperCase() !== "ASC" &&
    sortId.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por id son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortBrand}'`;
  }

  if (
    sortName !== "" &&
    sortName.toUpperCase() !== "ASC" &&
    sortName.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por nombre son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortName}'`;
  }

  if (
    sortPrice !== "" &&
    sortPrice.toUpperCase() !== "ASC" &&
    sortPrice.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por precio son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortPrice}'`;
  }

  if (
    sortRating !== "" &&
    sortRating.toUpperCase() !== "ASC" &&
    sortRating.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por rating son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortRating}'`;
  }
  return query;
};

module.exports = inputValidator;
