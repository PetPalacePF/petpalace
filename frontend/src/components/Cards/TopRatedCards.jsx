import { useEffect, useState } from "react";
import { Card } from "./Card";
import addToCart from "../../utils/sendToCart";
import { getAllProducts } from "../../utils/getAllProducts";
import { BACKEND_URL } from "../../config/config";

const TopRatedCards = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [productAdded, setProductAdded] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product.id, 1, null); // Adjust the parameters as needed
    setProductAdded(true);
    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setProductAdded(false);
        setClosing(false);
      }, 300);
    }, 1500);
  };

  const closeAlert = () => {
    setProductAdded(false);
    setClosing(false);
  };

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        await getAllProducts();
        const response = await fetch(`${BACKEND_URL}/products?sortRating=DESC`);
        const data = await response.json();
        const filteredData = data.products.filter(product => product.enabled)

        // Select the top 4 rated products
        const topRatedProducts = filteredData.slice(0, 4);

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
        <Card
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default TopRatedCards;
