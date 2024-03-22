const removeProduct = require("../../../controllers/Products/removeProduct")

const deleteProducts = async (req,res) =>{
    try {
        const {id} = req.params

        await removeProduct(id)

        res.status(200).json({message: "Producto eliminado correctamente"})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports = deleteProducts