const { Product, Category } = require("../../db");
const findProductbyId = require("../../controllers/Products/findProductbyId");

const modifyProduct = async (putBody) => {
  const {
    id,
    brand,
    name,
    img,
    description,
    price,
    stock,
    rating,
    enabled,
    categories,
  } = putBody;
  try {
    let updatedProduct = await Product.update(
      {
        brand,
        name,
        img,
        description,
        price,
        stock,
        rating,
        enabled,
      },
      { where: { id: id } }
    );

    if (updatedProduct[0] === 0) {
      return { message: `Producto ${id} no encontrado` };
    }
    updatedProduct = await Product.findByPk(id);
    // Actualiza las categorías asociadas al producto
    await updatedProduct.setCategories(categories);

    // Obtiene el producto actualizado con las categorías
    updatedProduct = await findProductbyId(id);
    return updatedProduct.dataValues;
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    throw error;
  }
};

module.exports = modifyProduct;
