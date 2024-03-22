const {Product} = require("../../db")

const removeProduct = async (id) =>{

    try {
        await Product.destroy({
            where: {id:id},
            
        })
    } catch (error) {
    
        console.error(`Error al eliminar producto: ${error.message}`)
    }
}


module.exports = removeProduct