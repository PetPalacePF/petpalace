const findAll_returnValidator =  (rows, page, totalPages) => {
  let message;
  let status;

if (rows.length === 0) {
    if (page > totalPages) {
      message = `Se ha ingresado un número de página(${page}) superior al la última(${totalPages}). No se encontraron resultados para esta búsqueda.`;
      status = 404;
    } else {
      message = "No se encontraron resultados para esta búsqueda.";
      status = 404;
    }
  } else {
    message = "Se ha completado el pedido exitosamente.";
    status = 200;
  }
  return {message, status}
}

module.exports = findAll_returnValidator;
