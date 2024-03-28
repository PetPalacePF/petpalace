const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const findAllProducts = require("../../../controllers/Products/findAllProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");
const SortByQueryBrand = require("../../../controllers/Products/product_utils/SortByQueryBrand");
const SortByQueryName = require("../../../controllers/Products/product_utils/SortByQueryName");
const SortByQueryPrice = require("../../../controllers/Products/product_utils/SortByQuery");
const SortByQueryRating = require("../../../controllers/Products/product_utils/SortByQueryRating");
const notFoundValidator = require("../../../utils/validators/notFoundValidator");

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
    // findAllProducts(queryInputs)
    if (
      brand_or_name !== "" ||
      filterCategories.length > 0 ||
      filterPrice.length > 0 ||
      sortPrice !== "" ||
      sortRating !== ""
    ) {
      products = formattedProducts(await findAllProducts(queryInputs));

      if (products.length === 0) {
        const notFound_Products = await notFoundValidator(queryInputs);
        return res.status(404).json({ notFound_Products: notFound_Products });
      }
    } else {
      // findAllProducts()
      products = formattedProducts(await findAllProducts());
      if (products.length === 0) {
        await createBulkProducts();
        products = formattedProducts(await findAllProducts());
      }
    }

    // SortByQueryName (Jose)
    sortName !== "" && (products = await SortByQueryName(sortName));

    // SortByQueryBrand (Jose)
    sortBrand !== "" && (products = await SortByQueryBrand(sortBrand));

    // SortByQueryPrice (Tomi)
    // (sortPrice !== "" || sortRating !== "" ) && (products = await SortByQueryPrice(queryInputs));

    // SortByQueryRating (Tomi)
    // sortRating !== "" && (products = await SortByQueryRating(sortRating));

    //* CORRECCION DE FORMATO JSON POR DEFAULT
    // products = formattedProducts(products);

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
