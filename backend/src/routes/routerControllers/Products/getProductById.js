const findProductbyId = require("../../../controllers/Products/findProductbyId");
const formattedProduct = require("../../../utils/formatted/formattedProduct");



const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findProductbyId(id);
    return product
    ?  res.status(200).json({ product: formattedProduct(product) })
    :  res.status(400).send(`No existe el producto con id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductById;
