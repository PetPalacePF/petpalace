import { useEffect, useState } from "react";
import { Card } from "./Card";

const TopRatedCards = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        // Fetch top rated products from your API or database
        const response = await fetch("http://localhost:5000/products?sortRating=DESC");
        const data = await response.json();

        // Select the top 4 rated products
        const topRatedProducts = data.slice(0, 4);

        setTopRatedProducts(topRatedProducts);
      } catch (error) {
        console.error("Error fetching top rated products:", error);
      }
    };

    fetchTopRatedProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5">
      {topRatedProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TopRatedCards;