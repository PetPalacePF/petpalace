const findAllProducts = require("../../../controllers/Products/findAllProducts");
const filterByCategories = require("../../../controllers/Products/filterByCategories");
const filterByPrice = require("../../../controllers/Products/filterByPrice");
const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");

const getProducts = async (req, res) => {
  const {
    brand_or_name = "",
    page = 1,
    pageSize = 15,
    filterCategories = [],
    filterPrice = [],
  } = req.query;

  let products;

  try {
    // ByQueryName
    if (brand_or_name !== "") {
      products = formattedProducts(await findAllProducts(brand_or_name));
      if (products.length === 0) {
        return res.status(404).json({
          message: `No se ha encontrado ningun Producto que coincida con la palabra '${brand_or_name}'`,
        });
      }
    } else {
      products = formattedProducts(await findAllProducts());
      if (products.length === 0) {
        await createBulkProducts();
        products = formattedProducts(await findAllProducts());
      }
    }

    // FilterByQueryCategories (Tomi)
    filterCategories.length > 0 &&
      (products = await filterByCategories(filterCategories)); // Recibe un array de id de Categorias [1, 2, 3, ...]

    // FilterByQueryPrice (Jose / Tomi)
    filterPrice.length > 0 && (products = await filterByPrice(filterPrice)); // Recibe un array con dos valores [valorA, ValorB]

    //* CORRECCION DE FORMATO JSON POR DEFAULT
    // products = formattedProducts(products);

    return res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
