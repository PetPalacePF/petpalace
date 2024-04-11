import axios from "axios";
import { BACKEND_URL } from "../config/config";

const addToCart = async (productId, orderedProductQuantity = 1, ordersData) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  console.log("product quantity", orderedProductQuantity);
  console.log(userData);
  console.log("ordersData", ordersData);

  if (userData) {
    try {
      if (ordersData.orders.length > 0) {
        const response = await axios.put(`${BACKEND_URL}/orders`, {
          id: ordersData.orders[0].id,
          productsToAdd: [[productId, orderedProductQuantity]],
        });
        console.log("Product added (PUT) to cart:", response.data);
      } else {
        const response = await axios.post(`${BACKEND_URL}/orders`, {
          userId: userData.id,
          products: [[productId, orderedProductQuantity]],
        });
        console.log("Product added (POST) to cart:", response.data);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
};

export default addToCart;
