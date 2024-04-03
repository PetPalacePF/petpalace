
const SortByQuery = (queryInputs) => {
  const { sortBrand, sortId, sortName, sortPrice, sortRating } = queryInputs;

  let orderClause = [];

  if (sortBrand !== "") {
    const brandClause = ['brand', sortBrand];
    orderClause.push(brandClause);
  }

  if (sortId !== "") {
    const idClause = ['id', sortId];
    orderClause.push(idClause);
  }

  if (sortName !== "") {
    const nameClause = ['name', sortName];
    orderClause.push(nameClause);
  }

  if (sortPrice !== "") {
    const priceClause = ['price', sortPrice];
    orderClause.push(priceClause);
  }

  if (sortRating !== "") {
    const ratingClause = ['rating', sortRating];
    orderClause.push(ratingClause);
  }

  return orderClause;
};

module.exports = SortByQuery;
