/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import CartIcon from "../../assets/cart-24x24.png";
import addToCart from "../../utils/sendToCart";
import useGetOrdersData from "../../hooks/orders/useGetOrdersData";
import { useState } from "react";
import starFilled from "../../assets/starIcon-yellowFilled.png";
import { IoIosClose } from "react-icons/io";

export const Card = ({ product, onAddToCart }) => {
  const { ordersData } = useGetOrdersData();
  const [quantity, setQuantity] = useState(1);
  const [productAdded, setProductAdded] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product.id, quantity, ordersData);
    onAddToCart(product.name);
    setProductAdded(true);
  };

  const closeAlert = (event) => {
    event.stopPropagation();
    setProductAdded(false);
  };

  return (
    <div>
      <NavLink to={`/detail/${product.id}`}>
        <div className="h-[400px] w-[300px] flex-shrink-0 cursor-pointer">
          <div className="mb-4 relative h-[300px] w-[300px] bg-black">
            <img
              src={product.img}
              className="w-full h-full object-cover"
              alt=""
            />
            <span className="absolute top-3 left-4 border border-blue-200 text-xs rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100">
              {product.Categories[0].name}
            </span>
            <button
              className="absolute top-3 right-4 border border-blue-200 rounded-xl px-4 py-2 bg-blue-100 hover:bg-blue-300"
              onClick={(event) => handleAddToCart(event)}
            >
              <img src={CartIcon} alt="" className="w-4 h-4" />
            </button>
            <p className="absolute bottom-3 right-4 flex items-center border border-blue-200 bg-blue-100 rounded-md px-2 space-x-1 text-md">
              {`${product.rating}`}
              <img src={starFilled} alt="Full Star" className="h-4 w-4" />
            </p>
          </div>
          <div className="px-4 flex gap-4">
            <div className="flex flex-col w-full">
              <h3 className="text-lg font-bold text-slate-700 leading-7 whitespace-normal">
                {product.name}
              </h3>
              <h3 className="text-md font-bold text-slate-700 leading-7 whitespace-normal">
                {`from ${product.brand}`}
              </h3>
              <div className="flex gap-2">
                <p className="text-sm text-slate-800 font-bold">Price:</p>
                <p className="text-sm text-gray-800 font-bold">
                  {`$${product.price}.00`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <div>
        {productAdded && (
          <div className="fixed top-0 left-0 w-full flex justify-center items-center z-50 mt-4 animate-fadeIn">
            <div className="relative bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-sm">
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
    </div>
  );
};
