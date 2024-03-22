const { Product, Category } = require("../../db");

const updateProduct = async (productId, { product, categories }) => {
try {
    const existingProduct = await Product.findByPk(productId);
    
    if (!existingProduct) {
    console.log("Producto no encontrado");
    return null;
}

    await existingProduct.update(product);
    await existingProduct.removeCategories(await existingProduct.getCategories());

    if (categories && categories.length > 0) {
        const categorias = await Category.findAll({ where: { id: categories } });
        await existingProduct.addCategories(categorias);
    }

    return existingProduct;
} catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    throw error; 
}
};

module.exports = updateProduct;
