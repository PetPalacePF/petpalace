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
  filterCategories = [],
  sortRating = "",
  priceRange = [],
  search = "",
  location
) => {

  const querys = location.search.split('?')[1]
  console.log(querys)

  let unifiedWordFilterCategories = filterCategories.join("&filterCategories=");
  let unifiedWordFilterPrice = priceRange.join("&filterPrice=");

  let URLWordSearch = "brand_or_name=";
  let URLWordFilterCategories = "filterCategories=";
  let URLWordSortRating = "sortRating=";
  let URLWordFilterPrice = "filterPrice=";

  if (search !== "") {
    URLWordSearch = URLWordSearch + search;
  } else {
    URLWordSearch = "";
  }

  if (filterCategories.length > 0) {
    URLWordFilterCategories =
      URLWordFilterCategories + unifiedWordFilterCategories;
  } else {
    URLWordFilterCategories = "";
  }

  if (sortRating !== "") {
    URLWordSortRating = URLWordSortRating + sortRating;
  } else {
    URLWordSortRating = "";
  }

  if (priceRange.length > 0) {
    URLWordFilterPrice = URLWordFilterPrice + unifiedWordFilterPrice;
  } else {
    URLWordFilterPrice = "";
  }

  try {
    const response = await axios(
      `${URL}?${URLWordSearch}&${querys}&${URLWordSortRating}&${URLWordFilterPrice}`
    );
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
