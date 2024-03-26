const { Product, Category } = require("../../db");

const filterByCategories = async (query) => {

    const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["name"],
          where: { id: query }, 
          through: {
          attributes: [],
        },
    },
      order: [['id', 'ASC']]
    });
  return products
};

module.exports = filterByCategories;
