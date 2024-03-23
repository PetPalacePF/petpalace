const createProduct = require("../../../controllers/Products/createProduct");

const postProduct = async (req, res) => {
  const { brand, name, img, description, price
, stock, rating, enabled, categories } =
    req.body;

  const product = { brand, name, img, description, price
, stock, rating, enabled };

  try {
    const newProduct = await createProduct({ product, categories });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postProduct;
