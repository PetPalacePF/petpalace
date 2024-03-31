// import axios from "axios";

// export const getProductsByNameOrBrand = async ({
//   search,
//   navigate,
//   setProducts,
// }) => {
//   try {
//     if (search !== "" || search.length > 3) {
//       const response = await axios.get(
//         `http://localhost:5000/products?brand_or_name=${search}`
//       );
//       navigate("/shop");
//       setTimeout(() => {
//         setProducts(response.data);
//       }, 1000);
//     }
//   } catch (error) {
//     console.log("Error searching for products:", error);
//   }
// };
