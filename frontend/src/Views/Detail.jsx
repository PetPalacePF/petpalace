/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import starFilled from "../assets/starIcon-yellowFilled.png";
import starEmpty from "../assets/starIcon-yellowEmpty.png";
import closeBtn from "../assets/closeBtn.png";
import addToCart from "../utils/sendToCart";
import { useAuth0 } from "@auth0/auth0-react";
import useGetOrdersData from "../hooks/orders/useGetOrdersData";
import { BACKEND_URL } from "../config/config";
import { IoIosClose } from "react-icons/io";

const Detail = () => {
  const { ordersData, setOrdersData } = useGetOrdersData();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [productAdded, setProductAdded] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("buyNow", JSON.stringify(false));
    axios
      .get(`${BACKEND_URL}/products/${id}`)
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
    window.localStorage.removeItem("alternativeCart");
    const order = JSON.parse(window.localStorage.getItem("orderData"));
    let product_aux = product;
    product_aux.cantidad = quantity;
    order.products = [];
    order.products = [product_aux];
    window.localStorage.setItem("alternativeCart", JSON.stringify(order));
    window.localStorage.setItem("buyNow", JSON.stringify(true));
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
    addToCart(product.id, quantity, ordersData.orders);
    setProductAdded(true);
    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        setProductAdded(false);
        setClosing(false);
      }, 300);
    }, 1500);
  };

  const closeAlert = (event) => {
    event.stopPropagation();
    setProductAdded(false);
    setClosing(false);
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto rounded border border-gray-200">
        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              className="h-[500px] w-[500px] object-cover object-center rounded border border-gray-200"
            />
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 relative">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <NavLink to="/shop">
              <button className="absolute top-0 right-0 text-gray-500 hover:text-gray-900 p-2">
                <img src={closeBtn} alt="" />
              </button>
            </NavLink>
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
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 border border-gray-200 rounded-full p-2"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center mx-3"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 border border-gray-200 rounded-full p-2 mr-2"
                >
                  +
                </button>
                <div className="flex">
                  <button
                    onClick={(event) => handleAddToCart(event)}
                    className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:bg-violetamain rounded"
                  >
                    Add to cart
                  </button>
                  {isAuthenticated ? (
                    <NavLink
                      to="/cart/purchase"
                      onClick={makePayment}
                      className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:bg-violetamain rounded"
                    >
                      Buy now
                    </NavLink>
                  ) : (
                    <button
                      onClick={loginWithRedirect}
                      className="flex ml-auto text-white bg-violetahome border-0 py-2 px-4 mx-2 focus:outline-none hover:bg-violetamain rounded"
                    >
                      Log in to buy
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {productAdded && (
          <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-4 animate-fadeIn">
            <div
              className={`relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-sm ${
                closing ? "animate-fadeOut" : ""
              }`}
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">
                {" "}
                {product.name} added to your cart!
              </span>
              <span className="absolute top-0 right-0 mt-1 mr-1">
                <span
                  onClick={(event) => closeAlert(event)}
                  className="fill-current h-6 w-6 text-black-bold cursor-pointer"
                  role="button"
                >
                  <IoIosClose />
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Detail;
