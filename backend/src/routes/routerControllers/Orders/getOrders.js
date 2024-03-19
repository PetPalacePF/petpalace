const getOrders = async (req, res) => {
  try {
    return res.send("PETPALACE - TEST ORDERS '/orders'");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getOrders;
