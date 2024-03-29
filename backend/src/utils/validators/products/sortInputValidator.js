const sortInputValidator = (queryInputs) => {
  const { sortBrand, sortName, sortPrice, sortRating } = queryInputs;

  const query = {
    error: false,
    message: "",
  };

  if (
    sortBrand !== "" &&
    sortBrand.toUpperCase() !== "ASC" &&
    sortBrand.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar los productos por marca son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortBrand}'`;
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

module.exports = sortInputValidator;
