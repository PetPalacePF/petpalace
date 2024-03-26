const { Product, Category } = require("../../../db");

const SortByQueryRating = async (query) => {
console.log(query);
  // • Copia de findAllProducts •
  //   const products = await Product.findAll({
  //     include: {
  //       model: Category,
  //       attributes: ["name"],
  //       through: {
  //         attributes: [],
  //       },
  //     },
  //     order: [['id', 'ASC']]
  //   });
  
  const products = { name: `Test SortByQueryRating - query =  ${query}`}
  return products;
};

module.exports = SortByQueryRating;
