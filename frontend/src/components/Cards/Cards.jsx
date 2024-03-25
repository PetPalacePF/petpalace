import { useEffect, useState } from "react";
import { Card } from "./Card";

export default function Cards() {
  const [products, setProducts] = useState([]);
  // console.log("component rendered");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // console.log("esta es la db.json que traigo", data);
        // se esta consologueando 2 veces no se pq. Pero si te fijas, la data la trae bien
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const displayedProducts = products.slice(0, 4);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start my-5">
      {displayedProducts.map((product) => (
        <Card key={product.Id} product={product} />
      ))}
    </div>
  );
}
