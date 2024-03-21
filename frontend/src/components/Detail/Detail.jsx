import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { NavBar } from "../Nav Bar/NavBar";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/id/${id}`)
      .then(({ data }) => {
        if (data.name) {
          setProduct(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct({});
      });
  }, [id]);

  return (
    <div className="container mx-auto">
      <div>
        <Header />
      </div>
      <div>
        <NavBar />
      </div>
      <div className="m-5 p-5 border rounded">
        {product.img && (
          <img
            src={product.img}
            alt={product.name}
            className="mb-4 w-full rounded-lg"
          />
        )}
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-2">{product.name}</h1>
          <div>
            <h2 className="text-lg font-semibold">Brand:</h2>
            <p>{product.marca}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Price:</h2>
            <p>{product.precio}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Rating:</h2>
            <p>{product.rating}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Description:</h2>
            <p>{product.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
