const modifyPurchase = require("../../../controllers/Orders/modifyPurchase");

const putPurchase = async (req, res) => {
    const {purchaseId, orders, newUserId} = req.body;
    try {
        const updatedPurchase = await modifyPurchase(purchaseId ,orders, newUserId); 
        res.status(201).json(updatedPurchase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = putPurchase;