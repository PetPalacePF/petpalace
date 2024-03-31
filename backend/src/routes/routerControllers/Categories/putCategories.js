const modifyCategory = require("../../../controllers/Categories/modifyCategory");

const putCategories = async (req, res) => {
    const { id, name } = req.body;
    try {
    const updatedCategory = await modifyCategory(id, name);
    updatedCategory.hasOwnProperty('name')
    ? res.status(201).json(updatedCategory)
    : res.status(404).send(updatedCategory.message);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = putCategories;