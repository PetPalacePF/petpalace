import axios from "../config/axios";
import { BACKEND_URL } from "../config/config";

const getCategories = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/categories`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getCategories;
