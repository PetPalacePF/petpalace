const modifyOrder = require("../../../controllers/Orders/modifyOrder");

const putOrder = async (req, res) => {
    const {id, products} = req.body;
    try {
        const updatedOrder = await modifyOrder(id ,products); 
        updatedOrder.hasOwnProperty('id')
      ? res.status(201).json({updatedOrder: updatedOrder})
      : res.status(404).json({message: updatedOrder.message});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = putOrder;