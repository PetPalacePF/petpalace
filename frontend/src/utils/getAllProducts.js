
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { BACKEND_URL } from "../config/config";

export const getAllProducts = async (setProducts) => {
  try {
    if (setProducts) {
      const response = await axios(`${BACKEND_URL}/products`);
      setProducts(response.data.products);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getFilteredProducts = async (
  setProducts,
  filterCategories = [],
  sortRating = "",
  sortPrice = "",
  priceRange = [],
  search = "",
  location
) => {
  const querys = location.search.split("?")[1];

  let unifiedWordFilterCategories = filterCategories.join("&filterCategories=");
  let unifiedWordFilterPrice = priceRange.join("&filterPrice=");

  let URLWordSearch = "brand_or_name=";
  let URLWordFilterCategories = "filterCategories=";
  let URLWordSortRating = "sortRating=";
  let URLWordFilterPrice = "filterPrice=";
  let URLWordSortPrice = "sortPrice=";

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

  if (sortPrice !== "") {
    URLWordSortPrice = URLWordSortPrice + sortPrice;
  } else {
    URLWordSortPrice = "";
  }

  if (priceRange.length > 0) {
    URLWordFilterPrice = URLWordFilterPrice + unifiedWordFilterPrice;
  } else {
    URLWordFilterPrice = "";
  }

  try {
    const response = await axios(
      `${BACKEND_URL}/products?${URLWordSearch}&${querys}&${URLWordSortRating}&${URLWordSortPrice}&${URLWordFilterPrice}`
    );
    setProducts(response.data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
