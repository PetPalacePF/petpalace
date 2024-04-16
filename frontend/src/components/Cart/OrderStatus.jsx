// import React from 'react'

import { useEffect, useState } from "react";
import getPaymentSessions from "../../utils/getPaymentSessions";
import { NavLink } from "react-router-dom";
import postPurchases from "../../utils/postPurchases";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export const OrderStatus = () => {
  const initialStateStripe = [
    {
      stripe_payment_id: "",
      stripe_payment_status: "",
    },
  ];
  const [stripe, setStripe] = useState(initialStateStripe);

  const userInfo = JSON.parse(window.localStorage.getItem("userData"));

  const order = JSON.parse(window.localStorage.getItem("orderData"))

  const stripeSession = stripe[0];
  const { stripe_payment_id, stripe_payment_status } = stripeSession;
  const orders = [order.id];
  const userId = userInfo.id;
  postPurchases(orders, userId, stripe_payment_id, stripe_payment_status);

  useEffect(() => {
    getPaymentSessions(setStripe);
    return () => {
      setStripe(initialStateStripe);
      window.localStorage.removeItem("orderData");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-8 pb-8 mb-8">
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
          <div className="h-[1px] w-[150px] bg-black" />
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-black text-[white] w-6 h-6 flex items-center justify-center rounded-full">
              3
            </div>
            <h1 className="text-xl uppercase">Order Status</h1>
          </div>
        </div>
        <div className="mt-4">
          {
            stripe_payment_status === "succeeded" ? (
              <div>
                <div className="bg-green-200 border border-green-400 p-4 mb-4">
                  <div className="flex items-center">
                    <HiCheckCircle className="text-5xl text-green-500 mr-2" />
                    <p className="text-green-500 font-bold text-4xl">Payment Confirmed!</p>
                  </div>
                  <p className="mt-4 text-mg text-gray-700 font-bold leading">An email has been sent to {userInfo.email} with the details of your purchase.</p>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-4">Purchase Information:</h2>
                    <h3 className="text-2xl font-bold mb-4 text-gray-700">Order #{order.id}</h3>
                  </div>
                  <p>Thank you for choosing PetPalace. Your order has been processed. Read important information below.</p>
                  <div className="flex flex-col mt-4">
                    <h1 className='h-10 uppercase text-lg font-bold'>PRODUCTS:</h1>
                    <table className='w-full text-left'>
                      <tbody>
                        {
                          order.products.map(product => (
                            <tr key={product.id} className='border-t'>
                              <td className='flex items-center gap-1 h-22'>
                                <img
                                  src={product.img}
                                  className='w-14'
                                />
                                <div>
                                  <p className='text-l font-medium'>{product.name}</p>
                                  <p className='text-sm font-medium'>{product.brand}</p>
                                </div>
                              </td>
                              <td>${product.price}</td>
                              <td>
                                <p className="text-[16px] inline">
                                  {product.cantidad}
                                </p>
                              </td>
                              <td>${product.price * product.cantidad}</td>
                            </tr>
                          ))
                        }
                        <tr className='border-t'>
                          <td colSpan={3} className='font-medium text-lg'>Total</td>
                          <td className='font-medium text-lg'>
                            {
                              order.products.reduce((acc, product) => {
                                acc += product.price * product.cantidad
                                return acc
                              }, 0)
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className='h-10 uppercase text-lg font-bold mt-8'>Delivery:</h3>
                    <div>
                      <p className='text-l font-bold'>{userInfo.name}</p>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="font-medium">{userInfo.street_address} {userInfo.street_number}, {userInfo.city}, {userInfo.state}</p>
                      <p className="font-medium">{userInfo.country}</p>
                      <p className="font-medium">ZIP Code: {userInfo.ZIP_Code}</p>
                      <p className="font-medium">Phone Number: {userInfo.phone}</p>
                    </div>
                  </div>
                  <h3 className='h-10 uppercase text-lg font-bold mt-8'>Order Status</h3>
                  <div className="flex mb-4">
                    <div className="flex-1 mr-2">
                      <p className="text-black-500 font-bold">Payment Confirmation</p>
                      <div className="bg-green-500 h-2" />
                    </div>
                    <div className="flex-1 mr-2">
                      <p className="text-black-500 font-bold">Delivery: In Transit</p>
                      <div className="bg-yellow-200 h-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 font-bold">Customer Confirmation</p>
                      <div className="bg-gray-200 h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-200 border border-green-400 p-4 mb-4">
                <div className="flex items-center">
                  <HiXCircle className="text-5xl text-red-500 mr-2" />
                  <p className="text-red-500 font-bold text-4xl">Payment Rejected!</p>
                </div>
                <p className="mt-4 text-mg text-gray-700 font-bold leading">An error ocurred while processing your payment. Please go back and retry or continue shopping.</p>
                <div>
                  <NavLink
                    to="/cart/purchase"
                    className="h-16 uppercase font-medium border flex justify-center items-center bg-grey text-white w-full mt-8 hover:bg-green-800 transition-colors"
                  >
                    Back to your cart
                  </NavLink>
                </div>
              </div>
            )
          }
        </div>
        <NavLink
          to="/shop"
          className="h-16 uppercase font-medium border flex justify-center items-center bg-black text-white w-full mt-8 hover:bg-green-800 transition-colors"
        >
          Continue shopping
        </NavLink>
      </div>
    </div>
  );
};
