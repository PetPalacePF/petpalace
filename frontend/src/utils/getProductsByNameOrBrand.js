import axios from "axios";

export const getProductsByNameOrBrand = async ({
  search,
  setLoading,
  setError,
  navigate,
  setProducts,
}) => {
  try {
    if (search.length > 3) {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:5000/products?brand_or_name=${search}`
      );
      navigate("/shop");
      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 1000);
    }
  } catch (error) {
    setError("Error searching for products:", error);
    setLoading(false);
  }
};

export const getProductsByNameOrBrandOnchange = async ({
  search,
  setLoading,
  setError,
  navigate,
  setProducts,
  searchResults,
}) => {
  try {
    setLoading(true);
    setError(null);
    console.log(search);
    if (search !== "") {
      const response = await axios.get(
        `http://localhost:5000/products?brand_or_name=${search}`
      );
      navigate("/shop");
      setTimeout(() => {
        setProducts(response.data);
        setLoading(false);
      }, 1000);
    } else {
      setProducts([]);
      console.log(searchResults);
      setLoading(false);
    }
  } catch (error) {
    setError("Error searching for products:", error);
    setLoading(false);
  }
};
