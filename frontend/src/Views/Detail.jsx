import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { Id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${Id}`)
      .then(({ data }) => {
        if (data) {
          // Check if data exists
          setProduct(data);
          console.log(data)
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct({});
      });
  }, [Id]);

  return (
    <div className="container mx-auto">
      <div className="m-5 p-5 border rounded">
        {product.img && (
          <img
            src={product.img}
            alt={product.name}
            className="mb-4 w-full rounded-lg"
          />
        )}
        <div className="mb-4">
          <h1 className="text-xl font-bold mb-2">{product.Name}</h1>{" "}
          {/* Check property name */}
          <div>
            <h2 className="text-lg font-semibold">Brand:</h2>
            <p>{product.Brand}</p> {/* Check property name */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Price:</h2>
            <p>{product.Price}</p> {/* Check property name */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Rating:</h2>
            <p>{product.Rating}</p> {/* Check property name */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Description:</h2>
            <p>{product.Description}</p> {/* Check property name */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
