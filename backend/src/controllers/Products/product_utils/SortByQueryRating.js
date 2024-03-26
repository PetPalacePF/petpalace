const { Product, Category } = require("../../../db");

const SortByQueryRating = async (query) => {
    let products;

    if (query==="DESC") {
        products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            order: [['rating', 'DESC']] 
        });
    } else if(query==="ASC") {
        products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            order: [['rating', 'ASC']] 
        });
    }

    return products;
};

module.exports = SortByQueryRating;

