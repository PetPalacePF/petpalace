const getCategories = async (req, res) => {
  try {
    return res.send("PETPALACE - TEST CATEGORIES '/categories'");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCategories;
