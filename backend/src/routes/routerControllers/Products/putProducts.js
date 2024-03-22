const modifyProduct = require("../../../controllers/Products/modifyProduct");

const putProduct = async (req, res) => {
const {id ,brand, name, img, description, price
, stock, rating, categories } = req.body;

const product = {id ,brand, name, img, description, price
, stock, rating };

try {
    const updatedProduct = await modifyProduct({ product, categories });
    res.status(201).json(updatedProduct);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports = putProduct;