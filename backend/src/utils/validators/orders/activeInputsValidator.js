const activeInputsValidator = (queryInputs) => {
  const { filterPurchases, filterUsers, sortId } = queryInputs;

  let inputsActive = false;

  if (filterPurchases.length > 0 || filterUsers.length > 0 || sortId !== "") {
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
