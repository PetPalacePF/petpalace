import { useEffect, useState } from "react";
import { Card } from "./Card";
import { getAllProducts } from "../../utils/getAllProducts";
import { BACKEND_URL } from "../../config/config";

const TopRatedCards = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        await getAllProducts();
        const response = await fetch(`${BACKEND_URL}/products?sortRating=DESC`);
        const data = await response.json();

        // Select the top 4 rated products
        const topRatedProducts = data.products.slice(0, 4);

        setTopRatedProducts(topRatedProducts);
      } catch (error) {
        console.error("Error fetching top rated products:", error);
      }
    };

    fetchTopRatedProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5 max-w-[1400px] gap-8">
      {topRatedProducts.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TopRatedCards;
