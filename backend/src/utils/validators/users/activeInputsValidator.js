const activeInputsValidator = (queryInputs) => {
  const { name_or_email, sortId } = queryInputs;

  let inputsActive = false;

  if ( name_or_email !== "" ||  sortId !== "") {
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
