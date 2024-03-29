const activeInputsValidator = (queryInputs) => {
  const { filterOrders, filterUsers, sortId } = queryInputs;

  let inputsActive = false;

  if (filterOrders.length > 0 || filterUsers.length > 0 || sortId !== "") {
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
