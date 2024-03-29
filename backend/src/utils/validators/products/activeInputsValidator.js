const activeInputsValidator = (queryInputs) => {
  const {
    brand_or_name,
    page,
    pageSize,
    filterCategories,
    filterPrice,
    sortName,
    sortBrand,
    sortPrice,
    sortRating,
  } = queryInputs;

  let inputsActive = false;

  if (
    brand_or_name !== "" ||
    filterCategories.length > 0 ||
    filterPrice.length > 0 ||
    sortBrand !== "" ||
    sortName !== "" ||
    sortPrice !== "" ||
    sortRating !== ""
  ) {
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
