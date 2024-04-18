const formattedProduct_forPurchases = (product) => {
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

  const categories = Categories.map((category) => category.id);

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

module.exports = formattedProduct_forPurchases;
