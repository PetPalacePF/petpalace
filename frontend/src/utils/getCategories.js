import axios from "../config/axios";
import { URL } from "../config/config";

const getCategories = async () => {
  try {
    const { data } = await axios.get(`${URL}/categories`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getCategories;
