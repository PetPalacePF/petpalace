const findAllProducts = require("../../../controllers/Products/findAllProducts");
const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");

const getProducts = async (req, res) => {
  try {
    let products = await findAllProducts();
    if (products.length === 0) {
      await createBulkProducts()
      products = await findAllProducts();
    };
    return res.status(200).json({ products: formattedProducts(products) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
