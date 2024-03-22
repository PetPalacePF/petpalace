const {User,Order, Purchase} = require("../../db")


const removeUser = async(id)=> {

    try {
        await User.destroy({
            where: { id: id},
            include: [Order, Purchase]
        })
    } catch (error) {
        console.error(`Error al eliminar usuario: ${error.message}`)
    }
}




module.exports = removeUser