const createBulkProducts = require("../../../controllers/Products/createBulkProducts");
const findAllProducts = require("../../../controllers/Products/findAllProducts");
const formattedProducts = require("../../../utils/formatted/formattedProducts");
const activeInputsValidator = require("../../../utils/validators/products/activeInputsValidator");
const notFoundValidator = require("../../../utils/validators/products/notFoundValidator");
const sortInputValidator = require("../../../utils/validators/products/sortInputValidator");

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
    sortBrand,
    sortName,
    sortPrice,
    sortRating,
  };

  const queryError = sortInputValidator(queryInputs);
  if (queryError.error) {
    return res.status(404).send(queryError.message);
  }
  const inputsActive = activeInputsValidator(queryInputs);
  let products;

  try {
    if (inputsActive) {
      products = await findAllProducts(queryInputs);
      if (products.length === 0) {
        const notFound_Products = notFoundValidator(queryInputs);
        return res.status(404).send(notFound_Products);
      }
    } else {
      products = await findAllProducts();
      if (products.length === 0) {
        await createBulkProducts();
        products = await findAllProducts();
      }
    }

    products = formattedProducts(products);

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getProducts;
