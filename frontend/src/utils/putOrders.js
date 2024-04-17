import axios from "axios";
import { BACKEND_URL } from "../config/config";

const putOrders = async (alternativeCart, orderData) => {
  let productsToAdd = [];
  let productsToRemove = [];
  
  if (alternativeCart && orderData) {
    const uniqueProduct = alternativeCart.products;
    uniqueProduct.forEach(product => {
      productsToAdd = [...productsToAdd, [product.id, product.cantidad]]
    });
    
    const { id, products } = orderData;
    products.forEach(product => {
      productsToRemove = [...productsToRemove, [product.id]]
    });
    
    
    try {
      const response = await axios.put(`${BACKEND_URL}/orders`, {
        id: id,
        productsToAdd: productsToAdd,
        productsToRemove: productsToRemove
      });
  
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }
};

export default putOrders;
