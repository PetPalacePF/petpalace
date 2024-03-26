import { Card } from "./Card";

const Cards = ({ products }) => {
  // Assuming 'products' is an array of objects with properties: id, name, image, price, category
  const displayedProducts = products.slice(0, 4); // Get only the first 4 products

  return (
    <div>
      <div>
        {displayedProducts.map((product) => (
          <Card key={product.id} />
        ))}
      </div>
    </div>
  );
};

