/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct({});
      });
  }, [id]);

  //* Stripe implementation
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51P0rxH2NIYOIQA82hkjbhAvzJzKGiKpivFNd8bVen5bbAUpBgz7IxiJCaEVXRxmAC2iOrDIcvwFFqi9Pqfgp4EiB00aboN6QK3")

    const body = {
      products: [{
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        // quantity: 1 //modificar esta parte del código
      }],
    }

    console.log("esto es body ", body);

    const response = await axios.post('http://localhost:5000/payment-session',
      body
    )

    console.log("esto es response ",response);

    const session = await response.data

    console.log("esto es session ", session);

    const result = stripe.redirectToCheckout({
      sessionId: session.sessionId
    })

    console.log("esto es result ", result);
  }

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
          <button onClick={makePayment} className="bg-violetahome hover:bg-violetamain text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
