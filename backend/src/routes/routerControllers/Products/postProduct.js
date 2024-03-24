const createProduct = require("../../../controllers/Products/createProduct");

const postProduct = async (req, res) => {
  const {
    brand,
    name,
    img,
    description,
    price,
    stock,
    rating,
    enabled,
    categories,
  } = req.body;

  if (!categories || categories.length === 0) {
    return res.status(500).json({
      error:
        "Para crear un producto, debe tener al menos una categoria asociada",
    });
  }

  const product = {
    brand,
    name,
    img,
    description,
    price,
    stock,
    rating,
    enabled,
  };

  try {
    const newProduct = await createProduct({ product, categories });
    newProduct.hasOwnProperty("name")
      ? res.status(201).json({ newProduct: newProduct })
      : res.status(404).json({ message: newProduct.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postProduct;
