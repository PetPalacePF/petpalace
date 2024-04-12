import { useState, useEffect } from "react";

import axios from "../../config/axios";

const useGetOrdersData = () => {
  const [ordersData, setOrdersData] = useState({ orders: [] });

  useEffect(() => {
    axios
      .get("/orders")
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
