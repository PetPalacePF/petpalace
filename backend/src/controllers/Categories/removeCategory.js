const {Category} = require("../../db")


const removeCategory = async(id) =>{
try {
    
    await Category.destroy({
        where: {id:id}
    })
    
} catch (error) {
    
    console.error(`Error al eliminar categoria: ${error.message}`)
}

}


module.exports = removeCategory