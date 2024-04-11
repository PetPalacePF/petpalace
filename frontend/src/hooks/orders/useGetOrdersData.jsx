import { useState, useEffect } from "react";

import axios from "../../config/axios";

const useGetOrdersData = () => {
  const [ordersData, setOrdersData] = useState({ orders: [] });
  const userInfo = JSON.parse(window.localStorage.getItem("userData"));
  const userId = userInfo ? userInfo.id : null;
  useEffect(() => {
    axios
      .get(`/orders?filterUsers=${userId}`)
      .then((res) => res.data)
      .then((data) => setOrdersData(data))
      .catch((err) => console.log(err));
  }, []);

  return {
    ordersData,
    setOrdersData,
  };
};

export default useGetOrdersData;
