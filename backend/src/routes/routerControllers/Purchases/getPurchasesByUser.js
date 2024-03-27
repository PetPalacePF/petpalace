const findPurchasesByUser = require("../../../controllers/Purchases/findPurchasesByUser");
const formattedPurchases = require("../../../utils/formatted/formattedPurchases");



const getPurchaseById = async (req, res) => {
    const { UserId } = req.params;
    const { sortPurchases="ASC" } = req.query;
    try {
    let purchases;

    if (sortPurchases === "ASC" || sortPurchases === "DESC") {
        purchases = await findPurchasesByUser(UserId, sortPurchases);
    }else{
        purchases = await findPurchasesByUser(UserId);
    }

    return purchases
    ?  res.status(200).json({ purchases: formattedPurchases(purchases) })
    :  res.status(400).send(`No existe la compra con id: ${UserId}`);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports = getPurchaseById;