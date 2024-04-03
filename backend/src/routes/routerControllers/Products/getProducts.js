const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const findAllProducts = require("../../../controllers/Products/findAllProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");
const activeInputsValidator = require("../../../utils/validators/products/activeInputsValidator");
const notFoundValidator = require("../../../utils/validators/products/notFoundValidator");
const inputValidator = require("../../../utils/validators/products/inputValidator");
const productsJsonError = require("../../../utils/validators/products/errors/productsJsonError");

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

  const queryError = inputValidator(queryInputs);
  if (queryError.error) {
    const message = productsJsonError(queryError.message);
    return res.status(404).json(message);
  }
  const inputsActive = activeInputsValidator(queryInputs);
  let products;

  try {
    if (inputsActive) {
      products = await findAllProducts(paginated, queryInputs);
      if (products.totalResults === 0) {
        const notFound_Products = notFoundValidator(queryInputs);
        const message = productsJsonError(notFound_Products);
        return res.status(404).json(message);
      }
    } else {
      products = await findAllProducts(paginated);
      if (products.totalResults === 0) {
        await createBulkProducts();
        products = await findAllProducts(paginated);
      }
    }

    const { totalResults, totalPages, currentPage, pageSize, productArray } =
      products;
      // if (totalPages === 0){}
    const productsResult = formattedProducts(productArray);
    let message;
    let status;
    if (totalResults.length === 0) {
      if (currentPage > totalPages) {
        message = "Se ha ingresado un número de página superior al la última.";
        status = 404;
      } else {
        message = "No se encontraron resultados para esta búsqueda";
        status = 404;
      }
    } else {
      message = "Se ha completado el pedido exitosamente";
      status = 200;
    }

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
