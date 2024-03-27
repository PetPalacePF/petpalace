const findOrdersByUser = require("../../../controllers/Orders/findOrdersByUser");
const formattedOrders = require("../../../utils/formatted/formattedOrders");


const getOrdersByUser = async (req, res) => {
    const { UserId } = req.params;
    const { sortOrders="ASC" } = req.query;
    try {
    let orders;

    if (sortOrders === "ASC" || sortOrders === "DESC") {
        orders = await findOrdersByUser(UserId, sortOrders);
    }else{
        orders = await findOrdersByUser(UserId);
    }

    return orders
    ?  res.status(200).json({ orders: formattedOrders(orders) })
    :  res.status(400).send(`No existe una orden con id: ${UserId}`);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

module.exports = getOrdersByUser;