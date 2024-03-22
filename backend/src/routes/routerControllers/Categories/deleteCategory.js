const removeCategory = require("../../../controllers/Categories/removeCategory")


const deleteCategory = async(req,res)=>{
    try {
        
        const {id} = req.params

        await removeCategory(id)

        res.status(200).json({message: "Categoria eliminada correctamente"})

    } catch (error) {

        res.status(500).json({error: error.message})  
    }
}

module.exports = deleteCategory