const { Product, Category } = require("../../../db");

const SortByQuery = async (queryInputs) => {
  const { sortBrand, sortName, sortPrice, sortRating } = queryInputs;

  let orderClause = [];

  if (sortBrand !== "") {
    const brandClause = ['brand', sortBrand];
    orderClause.push(brandClause);
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

  //   if (sortPrice.toUpperCase() === "ASC" || sortPrice.toUpperCase() === "DESC") {
//   products = await Product.findAll({
//     include: {
//       model: Category,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//     order: orderClause
//   });

  //   }

  return orderClause;
};

module.exports = SortByQuery;
