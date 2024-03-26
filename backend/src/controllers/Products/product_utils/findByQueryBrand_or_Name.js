const { Op } = require("sequelize");
const findByQueryBrand_or_Name = async (queryInputs) => {
  let whereClause = {};
  if (queryInputs && queryInputs.hasOwnProperty("brand_or_name")) {
    const { brand_or_name } = queryInputs;

    if (brand_or_name && brand_or_name !== "") {
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
  }
  return whereClause;
};

module.exports = findByQueryBrand_or_Name;
