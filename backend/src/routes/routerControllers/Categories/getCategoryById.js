const findCategorybyId = require("../../../controllers/Categories/findCategorybyId");


const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await findCategorybyId(id);
    return category
    ?  res.status(200).json({ category: category })
    :  res.status(400).send(`No existe una categoría con id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategoryById;
