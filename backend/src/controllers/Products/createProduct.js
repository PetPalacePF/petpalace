const { Product } = require("../../db");

const createProduct = async ({ product, categories }) => {
  try {
    if (!categories || categories.length === 0)
      throw new Error("Debe asignar al menos una categoria al producto.");
    const newProduct = await Product.create(product);
    newProduct.addCategories(categories);
    const productCompleted = { ...newProduct.dataValues, categories };
    return productCompleted;
  } catch (error) {
    console.log("error: ", error.message);
    return {message: error.message};
  }
};

module.exports = createProduct;
