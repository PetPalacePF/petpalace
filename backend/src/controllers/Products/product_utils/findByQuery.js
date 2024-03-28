const { Op } = require("sequelize");

const findByQuery = async (queryInputs) => {
  const { brand_or_name, filterPrice } = queryInputs;
  let whereClause = {};

  // FIND BY QUERY BRAND OR NAME
  if (brand_or_name !== "") {
    whereClause[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${brand_or_name}%`,
        },
      },
      {
        brand: {
          [Op.iLike]: `%${brand_or_name}%`,
        },
      },
    ];
  }

  // FILTER BY QUERY PRICE
  if (filterPrice instanceof Array && filterPrice.length === 2) {
    const prices = filterPrice.map((price) => parseInt(price.trim()));
    whereClause.price = {
      [Op.between]: [prices[0], prices[1]],
    };
  }

  return whereClause;
};

module.exports = findByQuery;
