const { Op, literal } = require("sequelize");

const findByQuery = (queryInputs) => {
  const { brand_or_name, filterBrands, filterPrice } = queryInputs;
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

  // FILTER BY QUERY BRAND
  if (filterBrands instanceof Array && filterBrands.length > 0) {
    const lowerCaseBrandsToCheck = filterBrands.map((brand) =>
      brand.toLowerCase()
    );
    whereClause = {
      ...whereClause,
      brand: literal(
        `LOWER("brand") IN ('${lowerCaseBrandsToCheck.join("', '")}')`
      ),
    };
  } else if (filterBrands !== "") {
    whereClause = {
      ...whereClause,
      brand: literal(`LOWER("brand") = LOWER('${filterBrands}')`),
    };
  }

  // FILTER BY QUERY PRICE
  if (filterPrice instanceof Array && filterPrice.length === 2) {
    const prices = filterPrice.map((price) => parseInt(price.trim()));
    whereClause.price = {
      [Op.between]: [prices[0], prices[1]],
    };
  }
  console.log(whereClause);

  return whereClause;
};

module.exports = findByQuery;
