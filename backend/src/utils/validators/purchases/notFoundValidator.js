const notFoundValidator = (queryInputs) => {
  const { filterOrders, filterUsers, sortId } = queryInputs;

  if (filterOrders.length > 0 && filterUsers.length > 0) {
    return `No existen resultados para esa combinacion de filtros`;
  }

  if (filterOrders.length > 0) {
    return `No se ha encontrado ninguna Compra que contenga una Orden con los siguientes id: '${filterUsers}'`;
  }
  
  if (filterUsers.length > 0) {
    return `No se ha encontrado ninguna Compra que contenga un Usuario con los siguientes id: '${filterUsers}'`;
  }

  if (sortId !== "") {
    return `La tabla de compras se encuentra actualmente vacía, no hay compras para ordenar por id.`;
  }
};

module.exports = notFoundValidator;
