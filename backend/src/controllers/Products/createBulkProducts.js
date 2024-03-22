const { Product } = require("../../db");
const findJsonProducts = require("../../utils/json/findJsonProducts");


const createBulkProducts = async () => {
  try {
    const jsonProducts = await findJsonProducts();
    const bulkProducts = await Product.bulkCreate(jsonProducts);
    console.log(bulkProducts);
    return bulkProducts; 
  } catch (error) {
    console.log(error);
  }

};

module.exports = createBulkProducts;
