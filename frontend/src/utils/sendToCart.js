import axios from "axios";

const addToCart = async (productId) => {
  try {
    const response = await axios.post("http://localhost:5000/orders", {
      userId: 1,
      products: [productId],
    });
    console.log("Product added to cart:", response.data);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export default addToCart;
