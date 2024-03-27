const { Product, Category } = require("../../../db");

const SortByQueryName = async (query) => {
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
    order: [['name', orderDirection]]
  });
  
  return products;
};

module.exports = SortByQueryName;
