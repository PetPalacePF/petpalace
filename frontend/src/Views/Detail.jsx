import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then(({ data }) => {
        console.log("Product Data:", data);
        setProduct(data.product); // Update state with the nested product data
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct({});
      });
  }, [id]);

  return (
    <div className="container mx-auto my-10 flex justify-center">
      <div className="m-5 p-5 border rounded shadow-lg max-w-xl flex">
        {product.img && (
          <img
            src={product.img}
            alt={product.name}
            className="mr-8 rounded-lg w-1/2"
          />
        )}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="flex mb-2">
            <h2 className="text-lg font-semibold mr-2">{product.brand}</h2>
          </div>
          <div className="flex mb-2">
            <h2 className="text-lg font-semibold mr-2">{product.rating}/5</h2>
          </div>
          <div className="flex mb-2">
            <h2 className="text-lg font-semibold mr-2">
              {product.description}
            </h2>
          </div>
          <div className="flex mb-2">
            <h2 className="text-lg font-semibold mr-2">${product.price}</h2>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
            Add to Cart
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
