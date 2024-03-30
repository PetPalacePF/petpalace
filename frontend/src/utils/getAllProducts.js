/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
const URL = "http://localhost:5000/products";

export const getAllProducts = async (setProducts) => {
  try {
    const response = await axios(URL);
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getFilteredProducts = async (
  setProducts,
  filterCategories,
  sortRating,
  priceRange
) => {
  let palabraUnida = filterCategories.join("&filterCategories=");
  let palabraUnida3 = priceRange.join("&filterPrice=");

  let string = "filterCategories=";
  let string2 = "sortRating=";
  let string3 = "filterPrice=";

  if (filterCategories.length > 0) {
    string = string + palabraUnida;
  } else {
    string = "";
  }

  if (sortRating !== "") {
    string2 = string2 + sortRating;
  } else {
    string2 = "";
  }

  if (priceRange.length > 0) {
    string3 = string3 + palabraUnida3;
  } else {
    string3 = "";
  }

  try {
    const response = await axios(`${URL}?${string}&${string2}&${string3}`);
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
