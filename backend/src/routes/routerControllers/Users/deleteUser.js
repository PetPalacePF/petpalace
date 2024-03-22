const removeUser = require("../../../controllers/Users/removeUser")


const deleteUser = async (req, res) => {
    try {
        
        const {id} = req.params
         
       await  removeUser(id)
       
       res.status(200).json({message: "Usuario eliminado correctamente"})

    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

module.exports = deleteUser