const formattedProducts = (products) => {
  return products.map((product) => {
    const {
      id,
      brand,
      name,
      img,
      description,
      price,
      stock,
      rating,
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
      categories,
    };
  });
};

module.exports = formattedProducts;
