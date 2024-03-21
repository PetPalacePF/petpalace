import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <div>
        <div>
          <div>
            {/* {product.img && <img src={product.img} alt={product.name} />}{" "} */}
            <h1>Product Detail</h1>
            <div>
              <h1>Name: {product.name}</h1>
            </div>
            <div>
              <h2>Brand:</h2>
              <p>{product.marca}</p>
            </div>
          </div>
          <div>
            <div>
              <h2>Price:</h2>
              <p>{product.precio}</p>
            </div>
            <div>
              <h2>Description:</h2>
              <p>{product.descripcion}</p>
            </div>
            <div>
              <h2>Rating:</h2>
              <p>{product.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
