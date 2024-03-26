const { Product, Category } = require("../../db");
const findByQueryBrand_or_Name = require("./product_utils/findByQueryBrand_or_Name");
const filterByCategories = require("./product_utils/filterByCategories");

const findAllProducts = async (queryInputs) => {

  const whereClause_brand_or_Name = await findByQueryBrand_or_Name(queryInputs);
  const whereClause_categories = await filterByCategories(queryInputs);

  const products = await Product.findAll({
    where: whereClause_brand_or_Name,
    include: {
      model: Category,
      attributes: ["name"],
      where: whereClause_categories,
      through: {
        attributes: [],
      },
    },
    order: [["id", "ASC"]],
  });


  return products;
};

module.exports = findAllProducts;
