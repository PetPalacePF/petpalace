/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import CartIcon from "../../assets/cart-24x24.png";
import addToCart from "../../utils/sendToCart";

export const Card = ({ product }) => {
  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product.id);
  };

  return (
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
          {/* <button
            className="absolute top-3 right-4 border border-blue-200 rounded-xl px-4 py-2 bg-blue-100"
            onClick={(event) => handleAddToCart(event)}
          >
            <img src={CartIcon} alt="" className="w-4 h-4" />
          </button> */}
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
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
