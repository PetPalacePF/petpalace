const createCategorie = require("../../../controllers/Categories/createCategorie");

const postCategorie = async (req, res) => {
  const { name } = req.body;

  try {
    const newCategorie = await createCategorie({ name });
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postCategorie;
