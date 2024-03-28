/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
const URL = "http://localhost:5000/products"

export const getAllProducts = async (setProducts) => {
    try {
        const response = await axios(URL);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
};