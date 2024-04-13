import axios from "../config/axios.js";

const postPurchases = async (
  orders,
  userId,
  stripe_payment_id,
  stripe_payment_status
) => {
  const body = { orders, userId, stripe_payment_id, stripe_payment_status };
  try {
    if (
      !orders ||
      orders.length === 0 ||
      !userId ||
      userId === "" ||
      !stripe_payment_id ||
      stripe_payment_id === "" ||
      !stripe_payment_status ||
      stripe_payment_status === ""
    ) {
      return null;
    }

    const { data } = await axios.post("/purchases", body);

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default postPurchases;
