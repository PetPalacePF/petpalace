const inputValidator = (queryInputs) => {
  const { sortId } = queryInputs;

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
    query.message = `Los únicos valores válidos para organizar las ordenes por id son 'ASC' o 'DESC'. Se ha ingresado como valor: '${sortId}'`
  }
  return query;
};

module.exports = inputValidator;
