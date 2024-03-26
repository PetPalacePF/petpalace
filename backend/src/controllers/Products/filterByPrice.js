const { Product, Category } = require("../../db");
const { Op } = require("sequelize");

const filterByPrice = async (query) => {
  
  const prices = query.map(price => parseInt(price.trim()));

  try {
    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [prices[0], prices[1]]
        }
      },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["id", "ASC"]],
    });

    return products;
  } catch (error) {
    console.error("Error al filtrar productos por precio:", error);
    throw new Error("Error al filtrar productos por precio");
  }
};
module.exports = filterByPrice;
