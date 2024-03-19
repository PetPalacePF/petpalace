const getProducts = async (req, res) => {
  try {
    return res.send("PETPALACE - TEST PRODUCTS '/products'");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
