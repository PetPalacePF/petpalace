const removePurchase = require("../../../controllers/Purchases/removePurchase")

const deletePurchase = async (req,res) =>{
    try {
        const {id} = req.params

        await removePurchase(id)

        res.status(200).json({message: "Compra eliminada correctamente"})
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}


module.exports= deletePurchase