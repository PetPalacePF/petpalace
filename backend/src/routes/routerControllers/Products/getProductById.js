const findProductbyId = require("../../../controllers/Products/findProductbyId");
const formattedProduct = require("../../../utils/formatted/formattedProduct");
const jsonProductsErrorById = require("../../../utils/validators/products/errors/jsonProductsErrorById");




const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findProductbyId(id);
    return product
    ?  res.status(200).json(formattedProduct(product))
    :  res.status(404).json(jsonProductsErrorById(`No existe el producto con id: ${id}`));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductById;
