const { Product, Category } = require("../../../db");

const SortByQueryRating = async (sortRating) => {
  let products;

  if (
    sortRating.toUpperCase() === "ASC" ||
    sortRating.toUpperCase() === "DESC"
  ) {
    products = await Product.findAll({
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      order: [["rating", sortRating]],
    });
  }

  return products;
};

module.exports = SortByQueryRating;
