const getPurchases = async (req, res) => {
  try {
    return res.send("PETPALACE - TEST PURCHASES '/purchases'");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPurchases;
