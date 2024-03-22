const findAllCategories = require("../../../controllers/Categories/findAllCategories");
const formattedCategories = require("../../../utils/formatted/formattedCategories");
const createBulkCategories = require("../../../controllers/Categories/createBulkCategories");




const getCategories = async (req, res) => {
  try {
    let categories = await findAllCategories();
    if (categories.length === 0) {
      await createBulkCategories()
      categories = await findAllCategories();
    };
    return res.status(200).json({ categories: formattedCategories(categories) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
