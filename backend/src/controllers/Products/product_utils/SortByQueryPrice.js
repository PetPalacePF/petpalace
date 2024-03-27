const { Product, Category } = require("../../../db");

const SortByQueryPrice = async (query) => {
    let products;

    if (query==="ASC") {
        products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            order: [['price', 'ASC']] 
        });
    } else if(query==="DESC") {
        products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            order: [['price', 'DESC']] 
        });
    }

    return products;
};

module.exports = SortByQueryPrice;
