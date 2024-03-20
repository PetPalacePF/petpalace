const formattedCategories = (categories) => {
  return categories.map((categorie) => {
    const { id, name, Products } = categorie;

    const products = Products.map((product) => product.name);

    return {
      id,
      name,
      products,
    };
  });
};

module.exports = formattedCategories;
