const {Purchase} = require("../../db")


const removePurchase = async (id)=>{
    try {
        await Purchase.destroy({
            where: {id:id}
        })
    } catch (error) {
        console.error(`Error al eliminar compra: ${error.message}`)

    }
}


module.exports = removePurchase