import axios from "../config/axios.js";

const getPurchasefilterUsers = async ({ userId }, setPurchases) => {
  const fetchPurchases = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/purchases?filterUsers=${userId}`);
        setPurchases(response.data.purchases);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };
  fetchPurchases();
};

export default getPurchasefilterUsers;
