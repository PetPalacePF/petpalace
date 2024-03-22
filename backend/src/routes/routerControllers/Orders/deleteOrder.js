const removeOrder = require("../../../controllers/Orders/removeOrder")

const deleteOrder = async(req,res) =>{
    try {
        const {id} = req.params

        await removeOrder(id)

        res.status(200).json({message: "Orden eliminada correctamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = deleteOrder