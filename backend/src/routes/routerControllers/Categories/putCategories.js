const modifyCategory = require("../../../controllers/Categories/modifyCategory");

const putCategories = async (req, res) => {
    const { name } = req.body;
    try {
    const updatedCategory = await modifyCategory({ name });
    res.status(201).json(updatedCategory);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = putCategories;