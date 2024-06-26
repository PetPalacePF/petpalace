import axios from "axios";
import { BACKEND_URL } from "../config/config";

const addToCart = async (productId, orderedProductQuantity = 1, ordersData) => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));

  if (userData) {
    try {
      const response = await axios.post(`${BACKEND_URL}/orders`, {
        userId: userData.id,
        products: [[productId, orderedProductQuantity]],
      });
      window.localStorage.setItem("orderData", JSON.stringify(response.data.order));    
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
};

export default addToCart;
