const {Order} = require("../../db")

const removeOrder = async(id) =>{
    try {
        await Order.destroy({
            where:{id:id},
        })
    } catch (error) {

        console.error(`Error al eliminar orden: ${error.message}`)
    }
}


module.exports = removeOrder