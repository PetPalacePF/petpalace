const modifyUser= require("../../../controllers/Users/modifyUser");

const putUser = async (req, res) => {
const { id, name, email } = req.body;

try {
    const updatedUser = await modifyUser({id, name, email });
    res.status(201).json(updatedUser);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports = putUser;