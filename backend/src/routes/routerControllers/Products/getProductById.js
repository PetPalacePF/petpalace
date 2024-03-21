const findProductbyId = require("../../../controllers/Products/findProductbyId");


const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await findProductbyId(id);
    return product
    ?  res.status(200).json({ product: product })
    :  res.status(400).send(`No existe el producto con id: ${id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductById;
