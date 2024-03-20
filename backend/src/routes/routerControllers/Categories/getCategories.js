const findAllCategories = require("../../../controllers/Categories/findAllCategories");
const formattedCategories = require("../../../utils/formatted/formattedCategories");



const getCategories = async (req, res) => {
  try {
    const categories = await findAllCategories();
    return res.status(200).json({ categories: formattedCategories(categories) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
