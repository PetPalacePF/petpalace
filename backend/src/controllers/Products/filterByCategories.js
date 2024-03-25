const { Product, Category } = require("../../db");

const filterByCategories = async (query) => {
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
  
  const products = { name: `Test filterByCategories - query =  ${query}`}
  return products;
};

module.exports = filterByCategories;
