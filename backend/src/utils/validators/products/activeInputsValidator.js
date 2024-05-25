const activeInputsValidator = (queryInputs) => {
  const {
    brand_or_name,
    filterBrands,
    filterCategories,
    filterPrice,
    sortBrand,
    sortId,
    sortName,
    sortPrice,
    sortRating,
  } = queryInputs;

  let inputsActive = false;

  if (
    brand_or_name !== "" ||
    filterBrands !== "" ||
    filterCategories.length > 0 ||
    filterPrice.length > 0 ||
    sortBrand !== "" ||
    sortId !== "" ||
    sortName !== "" ||
    sortPrice !== "" ||
    sortRating !== ""
  ) {
    inputsActive = true;
  }
  return inputsActive;
};

module.exports = activeInputsValidator;
