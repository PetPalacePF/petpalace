const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const findAllProducts = require("../../../controllers/Products/findAllProducts");
const filterByPrice = require("../../../controllers/Products/filterByPrice");
const formattedProducts = require("../../../utils/formatted/formattedProducts");
const SortByQueryBrand = require("../../../controllers/Products/product_utils/SortByQueryBrand");
const SortByQueryName = require("../../../controllers/Products/product_utils/SortByQueryName");
const SortByQueryPrice = require("../../../controllers/Products/product_utils/SortByQueryPrice");
const SortByQueryRating = require("../../../controllers/Products/product_utils/SortByQueryRating");

const getProducts = async (req, res) => {
  const {
    brand_or_name = "",
    page = 1,
    pageSize = 15,
    filterCategories = [],
    filterPrice = [],
    sortName = "",
    sortBrand = "",
    sortPrice = "",
    sortRating = "",
  } = req.query;

  const queryInputs = {
    brand_or_name,
    page,
    pageSize,
    filterCategories,
    filterPrice,
    sortName,
    sortBrand,
    sortPrice,
    sortRating,
  };
  let products;

  try {
    // ByQueryName
    if (brand_or_name !== "" || filterCategories.length > 0) {
      products = formattedProducts(await findAllProducts(queryInputs));
      if (brand_or_name !== "" && products.length === 0) {
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

    // FilterByQueryPrice (Jose)
    filterPrice.length > 0 && (products = await filterByPrice(filterPrice)); // Recibe un array con dos valores [valorA, ValorB]

    // SortByQueryName (Jose)
    sortName !== "" &&
      (products = await SortByQueryName(sortName));


    // SortByQueryBrand (Jose)
    sortBrand !== "" &&
      (products = await SortByQueryBrand(sortBrand));


    // SortByQueryPrice (Tomi)
    sortPrice !== "" &&
      (products = await SortByQueryPrice(sortPrice));


    // SortByQueryRating (Tomi)
    sortRating !== "" &&
      (products = await SortByQueryRating(sortRating));


    //* CORRECCION DE FORMATO JSON POR DEFAULT
    // products = formattedProducts(products);

    return res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
