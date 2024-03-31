const activeInputsValidator = (queryInputs) => {
  const { filterOrders, filterUsers, sortId, sortUsers } = queryInputs;

  let inputsActive = false;

  if (filterOrders.length > 0 || filterUsers.length > 0 || sortId !== "" || sortUsers !== ""){
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
