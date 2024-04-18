import { useState, useEffect } from "react";
import useGetOrdersData from "../../hooks/orders/useGetOrdersData";

import OrderNotExists from "./OrderNotExists";
import AllOrders from "./AllOrders";

import CartIcon from "../../assets/cart.png";

const AsideCart = ({
  showCart,
  setShowCart,
  handleClickBuy,
  handleClickClose,
}) => {
  const { ordersData, setOrdersData } = useGetOrdersData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(true);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed ${
        !showCart ? "-right-[350px]" : "right-0"
      } top-0 h-screen w-[350px] bg-white z-50 pt-10 px-6 text-center flex flex-col gap-12 transition-all overflow-y-scroll`}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute top-0 right-0 w-4 h-4 bg-violetahome rounded-full flex items-center justify-center">
            <p>
              {ordersData.orders.length > 0
                ? ordersData.orders[ordersData.orders.length - 1].products?.length
                : "0"}
            </p>
          </div>
          <img src={CartIcon} className="w-6" />
        </div>
        <p className="uppercase" onClick={() => console.log(ordersData)}>
          Shopping Cart
        </p>
      </div>
      {ordersData.orders.length === 0 ||
      ordersData.orders[ordersData.orders.length -1].products?.length === 0 ? (
        <OrderNotExists setOpenCart={handleClickClose} />
      ) : (
        <AllOrders
          handleClickBuy={handleClickBuy}
          ordersData={ordersData.orders}
          setOrdersData={setOrdersData}
        />
      )}
    </div>
  );
};

export default AsideCart;
