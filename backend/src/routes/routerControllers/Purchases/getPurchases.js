const findAllPurchases = require("../../../controllers/Purchases/findAllPurchases");
const formattedPurchases = require("../../../utils/formatted/formattedPurchases");

const getPurchases = async (req, res) => {
  const { sortPurchases } = req.query;

  try {
    let purchases;

    if (sortPurchases === "ASC" || sortPurchases === "DESC") {
      purchases = await findAllPurchases(sortPurchases);
    } else {
      purchases = await findAllPurchases(); 
    }

    return res.status(200).json({ purchases: formattedPurchases(purchases) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchases;

