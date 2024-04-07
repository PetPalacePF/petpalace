import axios from "axios";

const addToCart = async (productId, orderedProductQuantity, users) => {
  console.log("product quantity", orderedProductQuantity);
  if (users) {
    const { id } = users.newUser;
    console.log("id del user", id);
    console.log(users);
    try {
      const response = await axios.post("http://localhost:5000/orders", {
        // userId: id,
        userId: 1, // Harcodeado para seguir trabajando
        products: [[productId, orderedProductQuantity]],
      });
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
};

export default addToCart;
