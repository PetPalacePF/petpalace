const { Product, Category } = require("../../db");

const filterByCategories = async (id) => {
  
    const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ["name"],
          where: {"id": id},
          through: {
          attributes: [],
        },
    },
      order: [['id', 'ASC']]
    });
  return products
};

module.exports = filterByCategories;
