const findAllProducts = require("../../../controllers/Products/findAllProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");

const getProducts = async (req, res) => {
  try {
    const products = await findAllProducts();
    return res.status(200).json({ products: formattedProducts(products) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
