const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const findAllProducts = require("../../../controllers/Products/findAllProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");
const activeInputsValidator = require("../../../utils/validators/products/activeInputsValidator");
const notFoundValidator = require("../../../utils/validators/products/notFoundValidator");
const inputValidator = require("../../../utils/validators/products/inputValidator");
const jsonProductsError = require("../../../utils/validators/products/errors/jsonProductsError");

const getProducts = async (req, res) => {
  const {
    brand_or_name = "",
    page = 1,
    pageSize = 15,
    filterBrands = "",
    filterCategories = [],
    filterPrice = [],
    sortBrand = "",
    sortId = "",
    sortName = "",
    sortPrice = "",
    sortRating = "",
  } = req.query;

  const paginated = { page, pageSize };

  const queryInputs = {
    brand_or_name,
    page,
    pageSize,
    filterBrands,
    filterCategories,
    filterPrice,
    sortBrand,
    sortId,
    sortName,
    sortPrice,
    sortRating,
  };

  //* INPUT
  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    const message = jsonProductsError(queryError.message);
    return res.status(404).json(message);
  }
  const inputsActive = activeInputsValidator(queryInputs);
  let products;

  try {
    if (inputsActive) {
      products = await findAllProducts(paginated, queryInputs);
      if (products.totalResults === 0) {
        const notFound_Products = notFoundValidator(queryInputs);
        const message = jsonProductsError(notFound_Products);
        return res.status(404).json(message);
      }
    } else {
      products = await findAllProducts(paginated);
      if (products.totalResults === 0) {
        await createBulkProducts();
        products = await findAllProducts(paginated);
      }
    }

    //* OUTPUT
    const {
      totalResults,
      totalPages,
      currentPage,
      pageSize,
      productsDB,
      status,
      message,
    } = products;

    const productsResult = formattedProducts(productsDB);
    return res.status(status).json({
      totalResults: totalResults,
      totalPages: totalPages,
      currentPage: currentPage,
      pageSize: pageSize,
      products: productsResult,
      message: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
