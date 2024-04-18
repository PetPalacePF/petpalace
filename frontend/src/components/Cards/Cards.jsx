import { useState, useEffect } from "react";
import { Card } from "./Card";
import { getAllProducts } from "../../utils/getAllProducts";
import addToCart from "../../utils/sendToCart";

export default function Cards() {
  const [products, setProducts] = useState([]);
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
    getAllProducts(setProducts);
  }, []);

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5 max-w-[1400px] gap-8">
      {displayedProducts?.map((product) => (
        <Card
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          productAdded={productAdded}
          closing={closing}
          closeAlert={closeAlert}
        />
      ))}
    </div>
  );
}
