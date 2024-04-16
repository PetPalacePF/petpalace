/* eslint-disable no-unused-vars */
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import axios from "../../config/axios";

import AllProducts from "../../components/Cart/AllProducts";
import Purchase from "../../components/Cart/Purchase";
import { OrderStatus } from "../../components/Cart/OrderStatus";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/config";
import useGetOrdersData from "../../hooks/orders/useGetOrdersData";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});

  const { ordersData, setOrdersData } = useGetOrdersData();

  const handleDecrement = (productId) => {
    const currentQuantity = productQuantities[productId] || 1; // Si no hay cantidad definida, asumimos 1 como mínimo
    const newQuantities = {
      ...productQuantities,
      [productId]: Math.max(currentQuantity - 1, 1), // Restar 1 a la cantidad actual, asegurando que no sea menor que 1
    };
    setProductQuantities(newQuantities); // Actualizar el estado de las cantidades
    localStorage.setItem("productQuantities", JSON.stringify(newQuantities)); // Guardar en el localStorage
  };

  const handleIncrement = (productId) => {
    const currentQuantity = productQuantities[productId] || 0; // Si no hay cantidad definida, asumimos 0
    const newQuantities = {
      ...productQuantities,
      [productId]: currentQuantity + 1, // Sumar 1 a la cantidad actual
    };
    setProductQuantities(newQuantities); // Actualizar el estado de las cantidades
    localStorage.setItem("productQuantities", JSON.stringify(newQuantities)); // Guardar en el localStorage
  };

  const handleDeleteProductCart = (id) => {
    setLoading(true);

    axios
      .put("/orders", {
        id: ordersData.orders[0].id,
        productsToRemove: [[id]],
      })
      .then((res) => res.data)
      .then((data) => {
        window.localStorage.setItem("orderData", JSON.stringify(data.order));
        console.log(data, ordersData);
        setOrdersData({ ...ordersData, orders: [data.order] });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const id = JSON.parse(window.localStorage.getItem("userData"))?.id;

  const [userInfo, setUserInfo] = useState({
    user: {
      id: null,
      name: "",
      email: "",
      orders: [],
      purchases: [],
      country: null,
      state: null,
      city: null,
      street_address: null,
      street_number: null,
      ZIP_Code: null,
      phone: null,
    },
  });

  useEffect(() => {
    const storedQuantities = localStorage.getItem("productQuantities");
    if (storedQuantities) {
      setProductQuantities(JSON.parse(storedQuantities));
    }
    if (id) {
      const getUserInformation = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/users/${id}`);
          console.log("esto es response ", response.data);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error al obtener información del usuario:", error);
        }
      };
      getUserInformation();
    }
  }, [id]);

  const nameComplete = userInfo.user;

  const name = nameComplete.name.split(" ")[0];
  console.log("esto es name ", name);

  const [selectedLink, setSelectedLink] = useState("/cart");
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const { user } = userInfo;

  console.log("esto es user ", user);

  const isComplete = () => {
    const requiredFields = [
      "name",
      "email",
      "ZIP_Code",
      "phone",
      "street_address",
      "city",
      "state",
      "country",
    ];
    return requiredFields.every((field) => user[field]);
  };

  const result = isComplete() ? true : false;

  console.log("isComplete", result);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {location.pathname === "/cart" && (
        <div>
          <div className="pt-[35px] w-full">
            <div className="bg-[#FAFAFA] h-24 flex justify-center items-center gap-4 w-full">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full">
                  1
                </div>
                <h1 className="text-xl uppercase">Shopping Cart</h1>
              </div>
              <div className="h-[1px] w-[150px] bg-[#ccc]" />
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">
                  2
                </div>
                <h1 className="text-xl uppercase text-[#ccc]">Purchase</h1>
              </div>
              <div className="h-[1px] w-[150px] bg-[#ccc]" />
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-[#ccc] text-[white] w-6 h-6 flex items-center justify-center rounded-full">
                  3
                </div>
                <h1 className="text-xl uppercase text-[#ccc]">Order Status</h1>
              </div>
            </div>
            <h1 className="text-center text-3xl text-black-800 font-semibold mt-4">
              Hi {name}! Please check your cart before proceeding...
            </h1>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <table className="w-[800px] text-left">
              <thead>
                <tr className="h-16 uppercase">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.orders[0]?.products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="flex items-center gap-1 h-22">
                      <img src={product.img} className="w-14" />
                      <div>
                        <p>{product.name}</p>
                        <button
                          onClick={() => handleDeleteProductCart(product.id)}
                          className="text-sm underline font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                    <td>${product.price}</td>
                    <td>
                      <div className="inline mr-3 w-4 h-4 text-xl">
                        <button onClick={() => handleDecrement(product.id)}>
                          -
                        </button>
                      </div>
                      <p className="text-[16px] inline">
                        {productQuantities[product.id] || 1}
                      </p>
                      <div className="inline ml-3 w-4 h-4 text-xl">
                        <button onClick={() => handleIncrement(product.id)}>
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-fit w-[300px] shadow-lg flex flex-col gap-4 p-5 ml-7">
              <div className="flex justify-between">
                <p>Total</p>
                <p>
                  {ordersData.orders[0]?.products.reduce((acc, product) => {
                    const quantity = productQuantities[product.id] || 1;
                    acc += product.price * quantity;
                    return acc;
                  }, 0)}
                </p>
              </div>
              <NavLink
                to="/cart/purchase"
                className="h-8 uppercase font-medium border flex justify-center items-center bg-black text-white"
                onClick={() => handleLinkClick("/cart/purchase")}
              >
                Purchase
              </NavLink>
              <NavLink
                to="/shop"
                className="h-8 uppercase font-medium border flex justify-center items-center mt-2"
              >
                Continue shopping
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {location.pathname === "/cart/purchase" && (
        <div className="pt-[35px]">
          <div>
            <Purchase
              userInfo={userInfo}
              result={result}
              ordersData={ordersData}
            />
          </div>
        </div>
      )}
      {location.pathname === "/cart/orderStatus" && (
        <div>
          <OrderStatus />
        </div>
      )}
    </div>
  );
};

export default Cart;
