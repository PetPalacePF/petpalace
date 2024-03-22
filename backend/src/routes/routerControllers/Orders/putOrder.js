const modifyOrder = require("../../../controllers/Orders/modifyOrder");

const putOrder = async (req, res) => {
    const {orderId, products, newUserId} = req.body;
    try {
        const updatedOrder = await modifyOrder(orderId ,products, newUserId); 
        res.status(201).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = putOrder;