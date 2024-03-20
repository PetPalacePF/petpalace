const formattedProducts = (products) => {
  return products.map((product) => {
    const { id, brand, name, img, description, priece, stock, rating, Categories } =
      product;

    const categories = Categories.map((categorie) => categorie.name);

    return {
      id,
      brand,
      name,
      img,
      description,
      priece,
      stock,
      rating,
      categories,
    };
  });
};

module.exports = formattedProducts;
