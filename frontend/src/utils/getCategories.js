import axios from "../config/axios";
const URL = "http://localhost:5000/categories"

const getCategories = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/categories");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getCategories;
