import { useState, useEffect } from "react";

import axios from "../../config/axios";

const useGetOrdersData = () => {
  const [ordersData, setOrdersData] = useState({ orders: [] });

  const userId = JSON.parse(window.localStorage.getItem("userData"))

  useEffect(() => {
    axios
      .get(`/orders?filterUsers=${userId.id}`)
      .then((res) => res.data)
      .then((data) => {
        setOrdersData(data)
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    ordersData,
    setOrdersData,
  };
};

export default useGetOrdersData;
