const inputValidator = (queryInputs) => {
  const { sortId, sortUsers} = queryInputs;

  const query = {
    error : false,
    message: ""
  }

  if (
    sortId !== "" &&
    sortId.toUpperCase() !== "ASC" &&
    sortId.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar las compras por id son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortId}'`
  }

  if (
    sortUsers !== "" &&
    sortUsers.toUpperCase() !== "ASC" &&
    sortUsers.toUpperCase() !== "DESC"
  ) {
    query.error = true;
    query.message = `Los únicos valores válidos para ordenar las compras por usuarios son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortUsers}'`
  }
  return query;
};

module.exports = inputValidator;
