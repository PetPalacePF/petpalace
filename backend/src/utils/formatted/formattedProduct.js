const formattedProduct = (product) => {
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
    Categories,
  } = product;

  const categories = Categories.map((category) => category.name);

  return {
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
  };
};

module.exports = formattedProduct;
