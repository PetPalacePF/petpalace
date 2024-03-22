const { Category } = require("../../db");
const findJsonCategories = require("../../utils/json/findJsonCategories");

const createBulkCategories = async () => {
  try {
    const jsonCategories = await findJsonCategories();
    const bulkCategories = await Category.bulkCreate(jsonCategories);
    return bulkCategories;
  } catch (error) {
    console.log(error);
  }
};

module.exports = createBulkCategories;
