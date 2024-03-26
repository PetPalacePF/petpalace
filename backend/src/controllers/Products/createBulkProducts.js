const { Product } = require("../../db");
const findJsonProducts = require("../../utils/json/findJsonProducts");
const findAllCategories = require("../../controllers/Categories/findAllCategories");
const createBulkCategories = require("../../controllers/Categories/createBulkCategories");

const createBulkProducts = async () => {
  try {
    let categories = await findAllCategories();
    if (categories.length === 0) {
      await createBulkCategories();
    }

    const jsonProducts = await findJsonProducts();
    for (const jsonProduct of jsonProducts) {
      const {
        brand,
        name,
        description,
        price,
        stock,
        rating,
        img,
        categories,
      } = jsonProduct;
      const product = { brand, name, img, description, price, stock, rating };
      const newProduct = await Product.create(product);
      await newProduct.addCategories(categories);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createBulkProducts;
