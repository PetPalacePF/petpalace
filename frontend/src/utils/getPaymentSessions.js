import axios from "../config/axios";
import { BACKEND_URL } from "../config/config";

const getPaymentSessions = async (setStripe) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/payment-session/payment`);
    setStripe(data)
    
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getPaymentSessions;
