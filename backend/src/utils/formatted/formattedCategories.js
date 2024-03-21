const formattedCategories = (categories) => {
  return categories.map((category) => {
    const { id, name, Products } = category;

    const products = Products.map((product) => product.name);

    return {
      id,
      name,
      products,
    };
  });
};

module.exports = formattedCategories;
