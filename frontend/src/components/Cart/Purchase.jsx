/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../../config/config";

const Purchase = ({ userInfo, result, ordersData, productQuantities }) => {
  const [flag, setFlag] = useState();
  

  const order = JSON.parse(window.localStorage.getItem("orderData"));
  const buyNow = JSON.parse(window.localStorage.getItem("buyNow"));
  const alternativeCart = JSON.parse(
    window.localStorage.getItem("alternativeCart")
  );

  let orderToSend;
  if (buyNow) {
    orderToSend = alternativeCart;
  } else if (flag) {
    orderToSend = alternativeCart;
  } else {
    orderToSend = order;
  }

  console.log("orderToSend :", orderToSend);

  const { user } = userInfo;

  useEffect(() => {
    if (buyNow) {
      setFlag(true);
    } else {
      setFlag(false);
    }
    
        
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P0rxH2NIYOIQA82hkjbhAvzJzKGiKpivFNd8bVen5bbAUpBgz7IxiJCaEVXRxmAC2iOrDIcvwFFqi9Pqfgp4EiB00aboN6QK3"
    );

    const body = {
      products: orderToSend.products.map(product => ({
          ...product,
          cantidad: productQuantities[product.id] || 1
        })),
        customerEmail: user.email,
  };

    const response = await axios.post(`${BACKEND_URL}/payment-session`, body);

    const session = await response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        <div className="h-24 bg-[#FAFAFA] flex justify-center items-center gap-4 w-full">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full">
              1
            </div>
            <h1 className="text-xl uppercase">Shopping Cart</h1>
          </div>
          <div className="h-[1px] w-[150px] bg-black" />
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-[white] w-6 h-6 flex items-center justify-center rounded-full">
              2
            </div>
            <h1 className="text-xl uppercase">Purchase</h1>
          </div>
          <div className="h-[1px] w-[150px] bg-[#ccc]" />
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">
              3
            </div>
            <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
          </div>
        </div>
        <div className="mt-4">
          {!result ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold">
                Looks like you have not completed your profile
              </h1>
              <span className="text-2xl font-bold">
                Please check your information and try again!
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold">Almost done!</h1>
              <span className="text-2xl font-bold">
                Please check your information before buying
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-screen mt-4 space-x-8">
        <div className="flex-1 p-4 mr-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              value={user.email}
              className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name:
            </label>
            <input
              value={user.name}
              name="name"
              className={`shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone number:
            </label>
            <input
              value={user.phone}
              name="phone"
              className={`shadow appearance-none border rounded w-1/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              disabled
            />
          </div>
          <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country:
              </label>
              <input
                value={user.country}
                name="country"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State/Province:
              </label>
              <input
                value={user.state}
                name="state"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City:
              </label>
              <input
                value={user.city}
                name="city"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
          </div>
          <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address:
              </label>
              <input
                value={user.street_address}
                name="street_address"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address Number:
              </label>
              <input
                value={user.street_number}
                name="street_number"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                ZIP Code:
              </label>
              <input
                value={user.ZIP_Code}
                name="ZIP_Code"
                className={`shadow appearance-none border rounded w-4/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                disabled
              />
            </div>
          </div>
          <div className="flex justify-between w-full mb-4 items-center flex-wrap md:flex-nowrap md:justify-start md:items-start md:space-x-4 md:space-y-0 space-y-4 space-x-0 p-4 md:p-0 md:mb-0 md:flex-wrap">
            {!result ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <NavLink
                  to="/profile/personalInfo"
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="button"
                >
                  Add personal information
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <NavLink
                  to="/profile/personalInfo"
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  type="button"
                >
                  Edit Personal Information
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 p-4">
          <table className="w-[500px] text-left">
            <thead>
              <tr className="h-16 uppercase">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderToSend?.products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="flex items-center gap-1 h-22">
                    <img src={product.img} className="w-14" />
                    <div>
                      <p className="text-l font-medium">{product.name}</p>
                      <p className="text-sm font-medium">{product.brand}</p>
                    </div>
                  </td>
                  <td>${product.price}</td>
                  <td>
                    <p className="text-[16px] inline">{productQuantities[product.id] || 1}</p>
                  </td>
                  <td>${(product.price * (productQuantities[product.id] || 1)).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t">
                <td colSpan={3} className="font-medium text-lg">
                  Total
                </td>
                <td className="font-medium text-lg">
                  ${orderToSend?.products.reduce((acc, product) => {
                    acc += product.price * (productQuantities[product.id] || 1);
                    return acc;
                  }, 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            {!result ? (
              <button
                to=""
                className="h-8 uppercase font-medium border flex justify-center items-center bg-black text-white w-full"
                type="button"
                disabled
              >
                Add shipping address
              </button>
            ) : (
              <button
                to="/cart/purchase"
                className="h-8 uppercase font-medium border flex justify-center items-center bg-black text-white w-full"
                onClick={makePayment}
              >
                buy now!
              </button>
            )}
            <NavLink
              to=""
              className="h-8 uppercase font-medium border flex justify-center items-center mt-2"
            >
              Modify Order
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
