const getMail = async (req, res) => {
    try {
      return res.send("PETPALACE - TEST MAIL '/mail'");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getMail;