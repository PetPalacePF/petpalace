const findAllPurchases = require("../../../controllers/Purchases/findAllPurchases");
const formattedPurchases = require("../../../utils/formatted/formattedPurchases");

const getPurchases = async (req, res) => {
  try {
    const purchases = await findAllPurchases();
    return res.status(200).json({ purchases: formattedPurchases(purchases) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchases;
