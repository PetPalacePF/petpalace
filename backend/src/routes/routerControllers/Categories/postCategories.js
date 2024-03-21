const createCategory = require("../../../controllers/Categories/createCategory");

const postCategories = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await createCategory({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCategories;
