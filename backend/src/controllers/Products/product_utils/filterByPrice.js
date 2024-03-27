const { Op } = require("sequelize");

const filterByPrice = async (queryInputs) => {
  const { filterPrice } = queryInputs;
  const prices = filterPrice.map((price) => parseInt(price.trim()));

  // console.log("prices: ", prices);
  let whereClause_price = {};

  if (filterPrice.length > 0) {
    whereClause_price = { [Op.between]: [prices[0], prices[1]] };
  }

  return whereClause_price;
};

module.exports = filterByPrice;

// const products = await Product.findAll({
//   where: {
//     price: {
//       [Op.between]: [prices[0], prices[1]]
//     }
//   },
//   include: [
