import { useState, useEffect } from "react";

import axios from "../../config/axios";

const useGetOrdersData = () => {
  const [ordersData, setOrdersData] = useState({ orders: [] });

  const userId = JSON.parse(window.localStorage.getItem("userData"));

  useEffect(() => {
    if (userId) {
      axios
        .get(`/orders?filterUsers=${userId.id}`)
        .then((res) => res.data)
        .then((data) => {
          setOrdersData(data);
          console.log("setOrdersData(data): ", data);
          window.localStorage.setItem(
            "orderData",
            JSON.stringify(data.orders[data.orders.length - 1])
          );
        });
    }
  }, []);

  return {
    ordersData,
    setOrdersData,
  };
};

export default useGetOrdersData;
