const modifyProduct = require("../../../controllers/Products/modifyProduct");
// const formattedProducts = require("../../../utils/formatted/formattedProducts");

const putProduct = async (req, res) => {
  const {
    id,
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

  const putBody = {
    id,
    brand,
    name,
    img,
    description,
    price,
    stock,
    rating,
    enabled,
    categories,
  };

  try {
    const updatedProduct = await modifyProduct(putBody);
    updatedProduct.hasOwnProperty("name")
      ? res.status(201).json({ updatedProduct: updatedProduct })
      : res.status(404).json({ message: updatedProduct.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putProduct;
