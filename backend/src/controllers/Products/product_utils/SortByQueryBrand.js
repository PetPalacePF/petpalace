const { Product, Category } = require("../../../db");

const SortByQueryBrand = async (query) => {
  console.log(query)
  let orderDirection = 'ASC';
  if (query.toUpperCase() === 'DESC') {
    orderDirection = 'DESC';
  }

  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
    order: [['brand', orderDirection]]
  });
  
  return products;
};

module.exports = SortByQueryBrand;
