import axios from "axios";
import { BACKEND_URL } from "../config/config";

const newOrderGenerator = async (order) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const buyNow = JSON.parse(window.localStorage.getItem("buyNow"));

  let productsToAdd = [];
  order.products.forEach((product) => {
    productsToAdd = [...productsToAdd, [product.id, product.cantidad]];
  });

  if (userData) {
    try {
      if (buyNow) {
        const postResponse = await axios.post(`${BACKEND_URL}/orders`, {
          userId: userData.id,
          products: productsToAdd,
        });
        window.localStorage.setItem(
          "orderData",
          JSON.stringify(postResponse.data.order)
        );
      } else {
        const postResponse = await axios.post(`${BACKEND_URL}/orders`, {
          userId: userData.id,
          products: [[1]],
        });

        const putResponse = await axios.put(`${BACKEND_URL}/orders`, {
          id: postResponse.data.order.id,
          productsToRemove: [[1]],
        });
        window.localStorage.setItem(
          "orderData",
          JSON.stringify(putResponse.data.order)
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }
};

export default newOrderGenerator;
