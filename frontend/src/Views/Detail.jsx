/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import starFilled from "../assets/starIcon-yellowFilled.png";
import starEmpty from "../assets/starIcon-yellowEmpty.png";
import addToCart from "../utils/sendToCart";
import { useAuth0 } from "@auth0/auth0-react";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { isAuthenticated, loginWithRedirect } = useAuth0();
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
    const stripe = await loadStripe(
      "pk_test_51P0rxH2NIYOIQA82hkjbhAvzJzKGiKpivFNd8bVen5bbAUpBgz7IxiJCaEVXRxmAC2iOrDIcvwFFqi9Pqfgp4EiB00aboN6QK3"
    );

    const body = {
      products: [
        {
          name: product.name,
          description: product.description,
          img: product.img,
          price: product.price,
          // quantity: 1 //modificar esta parte del código
        },
      ],
    };

    console.log("esto es body ", body);

    const response = await axios.post(
      "http://localhost:5000/payment-session",
      body
    );

    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  };

  const ratingToStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <img key={i} src={starFilled} alt="Full Star" className="h-5 w-5" />
        );
      } else {
        stars.push(
          <img key={i} src={starEmpty} alt="Empty Star" className="h-5 w-5" />
        );
      }
    }
    return <div className="flex">{stars}</div>;
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product.id);
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto rounded border border-gray-200">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              className="h-[500px] w-[500px] object-cover object-center rounded border border-gray-200"
            />
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand}
            </h2>
            <div className="flex mb-4">
              <div className="leading-relaxed">
                {ratingToStars(product.rating)}
              </div>
            </div>

            <p className="leading-relaxed">{product.description}</p>
            <div className="flex justify-between items-end mt-10">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}.00
              </span>
              <div className="flex">
                <button
                  onClick={(event) => handleAddToCart(event)}
                  className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:bg-violetamain rounded"
                >
                  Add to cart
                </button>
                {isAuthenticated ? (
                  <button
                    onClick={makePayment}
                    className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:violetamain rounded"
                  >
                    Buy now
                  </button>
                ) : (
                  <button
                    onClick={loginWithRedirect}
                    className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:violetamain rounded"
                  >
                    Log in to buy
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
